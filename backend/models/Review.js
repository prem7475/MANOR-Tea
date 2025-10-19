const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  helpful: {
    type: Number,
    default: 0
  },
  images: [{
    type: String
  }]
}, {
  timestamps: true
});

// Ensure one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Update product rating when review is saved
reviewSchema.post('save', async function() {
  const Product = mongoose.model('Product');
  const reviews = await mongoose.model('Review').find({ product: this.product });
  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const reviewCount = reviews.length;

  await Product.findByIdAndUpdate(this.product, {
    rating: Math.round(avgRating * 10) / 10,
    reviewCount
  });
});

// Update product rating when review is removed
reviewSchema.post('remove', async function() {
  const Product = mongoose.model('Product');
  const reviews = await mongoose.model('Review').find({ product: this.product });
  if (reviews.length === 0) {
    await Product.findByIdAndUpdate(this.product, { rating: 0, reviewCount: 0 });
  } else {
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(this.product, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
