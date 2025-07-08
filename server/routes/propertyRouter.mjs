
import express from "express";
import Property from "../models/propertyModel.mjs";
import { getDb } from "../db/conn.mjs";
import mongoose from "mongoose";
import requireAuth from "../middlewares/requireAuth.mjs";

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

// Get all properties with advanced filtering, pagination, and sorting
router.get("/properties", async (req, res) => {
  try {
    const db = getDb().connection;
    const {
      page = 1,
      limit = 12,
      location,
      propertyType,
      minPrice,
      maxPrice,
      preferedGender,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      isActive = true,
      isVerified
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (isVerified !== undefined) filter.isVerified = isVerified === 'true';
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (propertyType) filter.propertyType = propertyType;
    if (preferedGender && preferedGender !== 'any') filter.preferedGender = preferedGender;
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter.totalRent = {};
      if (minPrice) filter.totalRent.$gte = Number(minPrice);
      if (maxPrice) filter.totalRent.$lte = Number(maxPrice);
    }

    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Get properties with user details
    const properties = await db.collection("properties")
      .aggregate([
        { $match: filter },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "ownerDetails",
            pipeline: [
              { $project: { name: 1, photo: 1, email: 1 } }
            ]
          }
        },
        { $sort: sort },
        { $skip: skip },
        { $limit: Number(limit) },
        {
          $project: {
            title: 1,
            description: 1,
            location: 1,
            propertyType: 1,
            totalRooms: 1,
            totalRent: 1,
            preferedGender: 1,
            images: 1,
            amenities: 1,
            isActive: 1,
            isVerified: 1,
            createdAt: 1,
            ownerDetails: { $arrayElemAt: ["$ownerDetails", 0] }
          }
        }
      ])
      .toArray();

    // Get total count for pagination
    const totalCount = await db.collection("properties").countDocuments(filter);
    const totalPages = Math.ceil(totalCount / Number(limit));

    res.status(200).json({
      properties,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalCount,
        hasNext: Number(page) < totalPages,
        hasPrev: Number(page) > 1
      }
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({
      message: "An error occurred while fetching properties",
      error: error.message
    });
  }
});

// Get property statistics
router.get("/statistics", requireAuth, async (req, res) => {
  try {
    const db = getDb().connection;

    const stats = await db.collection("properties").aggregate([
      {
        $facet: {
          totalProperties: [{ $count: "count" }],
          activeProperties: [
            { $match: { isActive: true } },
            { $count: "count" }
          ],
          verifiedProperties: [
            { $match: { isVerified: true } },
            { $count: "count" }
          ],
          pendingProperties: [
            { $match: { isVerified: false, isActive: true } },
            { $count: "count" }
          ],
          propertyTypeDistribution: [
            {
              $group: {
                _id: "$propertyType",
                count: { $sum: 1 }
              }
            }
          ],
          locationDistribution: [
            {
              $group: {
                _id: "$location",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ],
          priceRanges: [
            {
              $bucket: {
                groupBy: "$totalRent",
                boundaries: [0, 5000, 10000, 15000, 20000, 50000],
                default: "50000+",
                output: {
                  count: { $sum: 1 },
                  averagePrice: { $avg: "$totalRent" }
                }
              }
            }
          ]
        }
      }
    ]).toArray();

    const result = stats[0];

    res.status(200).json({
      totalProperties: result.totalProperties[0]?.count || 0,
      activeProperties: result.activeProperties[0]?.count || 0,
      verifiedProperties: result.verifiedProperties[0]?.count || 0,
      pendingProperties: result.pendingProperties[0]?.count || 0,
      propertyTypeDistribution: result.propertyTypeDistribution,
      locationDistribution: result.locationDistribution,
      priceRanges: result.priceRanges
    });
  } catch (error) {
    console.error("Error fetching property statistics:", error);
    res.status(500).json({
      message: "An error occurred while fetching statistics",
      error: error.message
    });
  }
});

// Update property status (verify/approve/reject)
router.patch("/properties/:id/status", requireAuth, async (req, res) => {
  try {
    const db = getDb().connection;
    const { id } = req.params;
    const { isVerified, isActive, rejectionReason } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    const updateFields = {};
    if (isVerified !== undefined) updateFields.isVerified = isVerified;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (rejectionReason) updateFields.rejectionReason = rejectionReason;
    updateFields.updatedAt = new Date();

    const result = await db.collection("properties").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property status updated successfully",
      updated: result.modifiedCount > 0
    });
  } catch (error) {
    console.error("Error updating property status:", error);
    res.status(500).json({
      message: "An error occurred while updating property status",
      error: error.message
    });
  }
});

// Get properties by owner
router.get("/properties/owner/:ownerId", requireAuth, async (req, res) => {
  try {
    const db = getDb().connection;
    const { ownerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!ObjectId.isValid(ownerId)) {
      return res.status(400).json({ message: "Invalid owner ID" });
    }

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await db.collection("properties")
      .find({ owner: new ObjectId(ownerId) })
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .toArray();

    const totalCount = await db.collection("properties")
      .countDocuments({ owner: new ObjectId(ownerId) });

    res.status(200).json({
      properties,
      totalCount,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / Number(limit))
    });
  } catch (error) {
    console.error("Error fetching owner properties:", error);
    res.status(500).json({
      message: "An error occurred while fetching owner properties",
      error: error.message
    });
  }
});

// Bulk update properties
router.patch("/properties/bulk-update", requireAuth, async (req, res) => {
  try {
    const db = getDb().connection;
    const { propertyIds, updateFields } = req.body;

    if (!Array.isArray(propertyIds) || propertyIds.length === 0) {
      return res.status(400).json({ message: "Property IDs array is required" });
    }

    // Validate all IDs
    const validIds = propertyIds.filter(id => ObjectId.isValid(id));
    if (validIds.length !== propertyIds.length) {
      return res.status(400).json({ message: "Some property IDs are invalid" });
    }

    const objectIds = validIds.map(id => new ObjectId(id));
    updateFields.updatedAt = new Date();

    const result = await db.collection("properties").updateMany(
      { _id: { $in: objectIds } },
      { $set: updateFields }
    );

    res.status(200).json({
      message: "Properties updated successfully",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error("Error bulk updating properties:", error);
    res.status(500).json({
      message: "An error occurred while bulk updating properties",
      error: error.message
    });
  }
});

// Get featured properties
router.get("/properties/featured", async (req, res) => {
  try {
    const db = getDb().connection;
    const { limit = 6 } = req.query;

    const properties = await db.collection("properties")
      .find({
        isActive: true,
        isVerified: true,
        featured: true
      })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .toArray();

    res.status(200).json({ properties });
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    res.status(500).json({
      message: "An error occurred while fetching featured properties",
      error: error.message
    });
  }
});

export default router;
