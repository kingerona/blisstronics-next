import mongoose from 'mongoose';

const variationSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: String,
  attributes: { type: Map, of: String },
});

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    category: { type: [String], required: true },
    brand: String,
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    stockAmount: { type: Number, required: true },
    isFeatured: Boolean,
    isVisible: Boolean,
    isOnSale: Boolean,
    salePrice: Number,
    saleStarts: Date,
    saleEnds: Date,
    rating: Number,
    reviewCount: Number,
    variations: { type: [variationSchema] },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
