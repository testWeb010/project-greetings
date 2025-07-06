import express from 'express';
import mongoose from 'mongoose';
import Coupon from '../models/coupon.mjs';
import Membership from '../models/membership.mjs';
import requireAuth from '../middlewares/requireAuth.mjs';
import adminAuth from '../middlewares/adminAuth.mjs';

const router = express.Router();

// GET all coupons
router.get('/get-all-coupons', requireAuth, adminAuth, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    if (coupons.length === 0) {
      return res.status(200).json({ message: 'No coupons available' });
    }
    res.status(200).json({ coupons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching coupons' });
  }
});

// POST generate a new coupon
router.post('/generate-coupon', requireAuth, adminAuth, async (req, res) => {
  try {
    const { planId, discountType, discountValue, expiryDate, usageLimit } = req.body;

    // Validate the request body
    if (!planId || !discountType || !discountValue || !expiryDate || !usageLimit) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the plan exists
    const plan = await Membership.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Generate a unique coupon code
    let code = Math.random().toString(36).substring(2, 10).toUpperCase();
    // Ensure the generated code is unique
    while (await Coupon.findOne({ code })) {
        code = Math.random().toString(36).substring(2, 10).toUpperCase();
    }

    const newCoupon = new Coupon({
      code,
      planId,
      planName: plan.planName,
      discountType,
      discountValue,
      expiryDate,
      usageLimit,
    });

    const coupon = await newCoupon.save();

    res.status(201).json({ message: 'Coupon generated successfully', coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating coupon', error: error.message });
  }
});

// DELETE a coupon
router.delete('/delete-coupon/:couponId', requireAuth, adminAuth, async (req, res) => {
  try {
    const { couponId } = req.params;

    // Check if the coupon exists
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    await Coupon.findByIdAndDelete(couponId);

    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting coupon' });
  }
});

// PATCH toggle coupon status
router.patch('/toggle-coupon-status/:couponId', requireAuth, adminAuth, async (req, res) => {
  try {
    const { couponId } = req.params;
    const { isActive } = req.body;

    // Check if the coupon exists
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    coupon.isActive = isActive;
    await coupon.save();

    res.status(200).json({ message: 'Coupon status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating coupon status' });
  }
});


// POST verify coupon
router.post('/verify-coupon', requireAuth, async (req, res) => {
  try {
    const { couponCode, planId } = req.body;

    // Validate the request body
    if (!couponCode || !planId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the coupon exists
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Verify that the coupon is valid for the selected plan
    if (coupon.planId.toString() !== planId) {
      return res.status(400).json({ message: 'Coupon not valid for this plan' });
    }

    // Check if the coupon is active and not expired
    if (!coupon.isActive) {
      return res.status(400).json({ message: 'Coupon is not active' });
    }

    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    // Fetch plan details
    const plan = await Membership.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Calculate the discounted price based on the discount type
    let discountedPrice = 0;
    if (coupon.discountType === 'percentage') {
      discountedPrice = plan.discountedPrice - (plan.discountedPrice * coupon.discountValue / 100);
    } else if (coupon.discountType === 'fixed') {
      discountedPrice = plan.discountedPrice - coupon.discountValue;
    }

    if (discountedPrice < 0) {
      discountedPrice = 0; // Ensure price doesn't go below zero
    }

    res.status(200).json({ message: 'Coupon verified successfully', discountedPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying coupon' });
  }
});

export default router;