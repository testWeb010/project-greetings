
import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../db/conn.mjs";
import requireAuth from "../middlewares/requireAuth.mjs";
import { validateObjectId } from "../middlewares/validation.mjs";
import { apiLimiter } from "../middlewares/rateLimiter.mjs";

const router = express.Router();

// Helper function to build standard response
const buildResponse = (success, data = null, message = '', error = null) => ({
  success,
  data,
  message,
  error
});

// GET /api/blog/posts - Get all blog posts with pagination
router.get("/posts", apiLimiter, async (req, res) => {
  try {
    const db = getDb().connection;
    const {
      page = 1,
      limit = 10,
      category,
      search,
      featured
    } = req.query;

    const filter = {};
    
    if (category && category !== 'all') filter.category = category;
    if (featured === 'true') filter.featured = true;
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const posts = await db.collection("blog_posts")
      .find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .toArray();

    const total = await db.collection("blog_posts").countDocuments(filter);

    res.json(buildResponse(true, {
      posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json(buildResponse(false, null, "Failed to fetch blog posts", error.message));
  }
});

// GET /api/blog/posts/:id - Get blog post by ID
router.get("/posts/:id", validateObjectId, async (req, res) => {
  try {
    const db = getDb().connection;
    const { id } = req.params;

    const post = await db.collection("blog_posts").findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).json(buildResponse(false, null, "Blog post not found"));
    }

    res.json(buildResponse(true, post));
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json(buildResponse(false, null, "Failed to fetch blog post", error.message));
  }
});

// GET /api/blog/categories - Get all blog categories
router.get("/categories", async (req, res) => {
  try {
    const db = getDb().connection;

    const categories = await db.collection("blog_posts")
      .distinct("category");

    res.json(buildResponse(true, categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json(buildResponse(false, null, "Failed to fetch categories", error.message));
  }
});

// POST /api/blog/posts - Create new blog post (admin only)
router.post("/posts", requireAuth, async (req, res) => {
  try {
    const db = getDb().connection;
    
    const postData = {
      ...req.body,
      author: {
        id: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar || null
      },
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("blog_posts").insertOne(postData);
    const post = await db.collection("blog_posts").findOne({ _id: result.insertedId });

    res.status(201).json(buildResponse(true, post, "Blog post created successfully"));
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json(buildResponse(false, null, "Failed to create blog post", error.message));
  }
});

export default router;
