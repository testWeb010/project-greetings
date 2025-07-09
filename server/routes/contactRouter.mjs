
import express from "express";
import { getDb } from "../db/conn.mjs";
import { apiLimiter } from "../middlewares/rateLimiter.mjs";

const router = express.Router();

// Helper function to build standard response
const buildResponse = (success, data = null, message = '', error = null) => ({
  success,
  data,
  message,
  error
});

// POST /api/contact/submit - Submit contact form
router.post("/submit", apiLimiter, async (req, res) => {
  try {
    const db = getDb().connection;
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json(buildResponse(false, null, "All fields are required"));
    }

    const contactData = {
      name,
      email,
      subject,
      message,
      status: 'new',
      createdAt: new Date()
    };

    const result = await db.collection("contact_submissions").insertOne(contactData);

    res.status(201).json(buildResponse(true, { id: result.insertedId }, "Contact form submitted successfully"));
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json(buildResponse(false, null, "Failed to submit contact form", error.message));
  }
});

// GET /api/contact/submissions - Get all contact submissions (admin only)
router.get("/submissions", async (req, res) => {
  try {
    const db = getDb().connection;

    const submissions = await db.collection("contact_submissions")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json(buildResponse(true, submissions));
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    res.status(500).json(buildResponse(false, null, "Failed to fetch contact submissions", error.message));
  }
});

export default router;
