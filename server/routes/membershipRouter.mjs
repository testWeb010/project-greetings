
import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../db/conn.mjs";
import requireAuth from "../middlewares/requireAuth.mjs";
import { apiLimiter } from "../middlewares/rateLimiter.mjs";

const router = express.Router();

// Helper function to build standard response
const buildResponse = (success, data = null, message = '', error = null) => ({
  success,
  data,
  message,
  error
});

// GET /api/membership/plans - Get all membership plans
router.get("/plans", async (req, res) => {
  try {
    const db = getDb().connection;

    const plans = await db.collection("membership_plans")
      .find({ active: true })
      .sort({ price: 1 })
      .toArray();

    res.json(buildResponse(true, plans));
  } catch (error) {
    console.error("Error fetching membership plans:", error);
    res.status(500).json(buildResponse(false, null, "Failed to fetch membership plans", error.message));
  }
});

// GET /api/membership/user/:userId - Get user membership
router.get("/user/:userId", requireAuth, async (req, res) => {
  try {
    const db = getDb().connection;
    const { userId } = req.params;

    const membership = await db.collection("user_memberships")
      .findOne({ userId: new ObjectId(userId) });

    res.json(buildResponse(true, membership));
  } catch (error) {
    console.error("Error fetching user membership:", error);
    res.status(500).json(buildResponse(false, null, "Failed to fetch user membership", error.message));
  }
});

// POST /api/membership/subscribe - Subscribe to membership plan
router.post("/subscribe", requireAuth, async (req, res) => {
  try {
    const db = getDb().connection;
    const { planId, paymentMethodId } = req.body;
    const userId = new ObjectId(req.user.id);

    const membershipData = {
      userId,
      planId: new ObjectId(planId),
      paymentMethodId,
      status: 'active',
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("user_memberships").insertOne(membershipData);
    const membership = await db.collection("user_memberships").findOne({ _id: result.insertedId });

    res.status(201).json(buildResponse(true, membership, "Membership subscription successful"));
  } catch (error) {
    console.error("Error subscribing to membership:", error);
    res.status(500).json(buildResponse(false, null, "Failed to subscribe to membership", error.message));
  }
});

export default router;
