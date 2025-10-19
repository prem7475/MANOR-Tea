const express = require('express');
const Analytics = require('../models/Analytics');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/analytics/track
// @desc    Track user analytics
// @access  Public
router.post('/track', async (req, res) => {
  try {
    const { type, user, product, data, sessionId } = req.body;

    const analytics = new Analytics({
      type,
      user,
      product,
      data,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      sessionId
    });

    await analytics.save();
    res.status(201).json({ message: 'Analytics tracked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/analytics/dashboard
// @desc    Get analytics dashboard data
// @access  Private/Admin
router.get('/dashboard', auth, admin, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = {};

    if (startDate && endDate) {
      dateFilter.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Get page views
    const pageViews = await Analytics.countDocuments({
      type: 'page_view',
      ...dateFilter
    });

    // Get product views
    const productViews = await Analytics.countDocuments({
      type: 'product_view',
      ...dateFilter
    });

    // Get cart additions
    const cartAdditions = await Analytics.countDocuments({
      type: 'cart_add',
      ...dateFilter
    });

    // Get purchases
    const purchases = await Analytics.countDocuments({
      type: 'purchase',
      ...dateFilter
    });

    // Get user registrations
    const registrations = await Analytics.countDocuments({
      type: 'user_registration',
      ...dateFilter
    });

    // Get top products viewed
    const topProducts = await Analytics.aggregate([
      { $match: { type: 'product_view', ...dateFilter } },
      { $group: { _id: '$product', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      { $project: { name: '$product.name', count: 1 } }
    ]);

    res.json({
      pageViews,
      productViews,
      cartAdditions,
      purchases,
      registrations,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/analytics/user-activity
// @desc    Get user activity analytics
// @access  Private/Admin
router.get('/user-activity', auth, admin, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const userActivity = await Analytics.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            type: '$type'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          activities: {
            $push: {
              type: '$_id.type',
              count: '$count'
            }
          }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json(userActivity);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
