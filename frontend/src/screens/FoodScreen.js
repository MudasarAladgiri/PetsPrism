import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const ToyScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-2xl font-bold mt-8 mb-3">Food</h1>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        {products
          .filter((product) => product.category === "Food")
          .map((product) => (
            <div key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </div>
          ))}
      </div>
    </>
  );
};

export default ToyScreen;
