const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Product Variant Schema
const ProductVariantSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  additionalPrice: {
    type: Number,
    default: 0
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('ProductVariant', ProductVariantSchema);
