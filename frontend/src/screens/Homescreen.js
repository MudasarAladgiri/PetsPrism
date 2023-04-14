import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import CarouselScreen from "./CarouselScreen";

import img1 from "./hero section/hero1.png";
import img2 from "./hero section/hero2.png";
import img3 from "./hero section/hero3.png";
import img4 from "./hero section/hero4.png";

const Homescreen = () => {
  const slide = [img1, img2, img3, img4];
  const { keyword } = useParams();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <CarouselScreen autoSlide={true}>
        {slide.map((s) => (
          <img src={s}></img>
        ))}
      </CarouselScreen>

      <div className="flex justify-center container ">
        <div className="w-full max-w-screen-lg">
          <h1 className="text-3xl font-bold text-center mt-12">
            Latest Products
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="container mx-auto my-24 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-50 transition duration-200 ease-in-out"
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Homescreen;
