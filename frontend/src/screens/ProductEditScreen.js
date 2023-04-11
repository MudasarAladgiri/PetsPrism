import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
  const [Name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInstock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [numberofreviews, setNumberofReviews] = useState(0);
  const [rating, setRating] = useState(0);

  const [uploading, setUploading] = useState(false);

  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      Navigate("/admin/productlist");
    } else {
      if (!product.Name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.Name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInstock);
        setDescription(product.description);
        setUser(product.user);
        setNumberofReviews(product.numberofreviews);
        setNumberofReviews(product.rating);
      }
    }
  }, [dispatch, Navigate, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        Name,
        price,
        image,
        category,
        countInstock,
        description,
        user,
        numberofreviews,
        rating,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <Link
          to="/admin/productlist"
          className="btn byn-light my-3 mt-5"
        ></Link>
        <h1 className="text-2xl font-bold mt-3">Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="container">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="name"
                placeholder="Enter Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-x-12">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter price url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <div class="relative flex flex-col items-center">
                <label
                  for="image-file"
                  class="w-full flex flex-col items-center justify-center px-4 py-2 bg-white text-gray-700 rounded-md shadow-sm tracking-wide border border-gray-300 cursor-pointer hover:bg-gray-50 hover:text-gray-800"
                >
                  <i class="fas fa-upload"></i>
                  <span class="mt-2 text-sm leading-normal">Choose File</span>
                  <input
                    id="image-file"
                    name="image"
                    type="file"
                    class="hidden"
                    onChange={uploadFileHandler}
                  />
                </label>
              </div>

              {uploading && <Loader />}
            </div>

            <div className="flex flex-col space-x-12">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-x-12">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="counInStock"
              >
                Count In stock
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Enter count In stock"
                value={countInstock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-x-12">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="user"
              >
                User
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="numberofreviews"
              >
                Number of Reviews
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Enter Number of Reviews"
                value={numberofreviews}
                onChange={(e) => setNumberofReviews(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-x-12">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="rating"
              >
                Rating
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Enter count In stock"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-9"
              type="submit"
            >
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
