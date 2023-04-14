import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc Fetch all the products
//@route  Get/api/products
//@access  Public

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        Name: {
          $regex: req.query.keyword,
          $options: "d",
        },
      }
    : {};
  const products = await Product.find({ ...keyword });
  res.json(products);
});

//@desc Fetch signle products
//@route  Get/api/products/:id
//@access  Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Delete product
//@route  DELETE/api/products/:id
//@access  Public/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }
  await Product.deleteOne({ _id: product.id });
  res.json({ message: "Product removed" });
});

//@desc create product
//@route  Post/api/products
//@access  Public/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    Name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/product_05.jpg",
    category: "food",
    countInstock: 0,
    numberofreviews: 0,
    description: "discription",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
//@desc update product
//@route  PUT/api/products/:id
//@access  Public/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    Name,
    price,
    user,
    image,
    category,
    countInstock,
    numberofreviews,
    description,
    rating,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.Name = Name;
    product.price = price;
    product.user = user;
    product.image = image;
    product.category = category;
    product.countInstock = countInstock;
    product.numberofreviews = numberofreviews;
    product.description = description;
    product.rating = rating;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route    POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id); // individual product

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already Reviewed");
    }

    const review = {
      Name: req.user.Name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404); // custom status code & error
    throw new Error("Product not found");
  }
});
   
//@desc get top rated products
//@route  GET/api/products/top
//@access  Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProducts,
  createProductReview,
};
