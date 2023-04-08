import React, { useEffect } from "react";
// import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { createOrder } from "../actions/orderActions";
const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  // calculate price
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(0);

  // shipinng
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      Navigate(`/order/${order._id}`);
    }
  }, [Navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full md:w-8/12">
          <ul className="list-none">
            <li className="border-b border-gray-300 mb-4 pb-4">
              <h2 className="text-2xl font-bold mb-2">Shipping</h2>
              <p className="text-lg font-medium">
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalcode},{cart.shippingAddress.country}
              </p>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-8/12">
          <ul className="list-none">
            <li className="border-b border-gray-300 mb-4 pb-4">
              <h2 className="text-2xl font-bold mb-2">Payment Method</h2>
              <p className="text-lg font-medium">
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-8/12">
          <ul className="list-none">
            <li className="border-b border-gray-300 mb-4 pb-4">
              <h2 className="text-2xl font-bold mb-2">Order Items</h2>
              <p className="text-lg font-medium">
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty!</Message>
                ) : (
                  <div className="bg-white rounded-lg shadow-md">
                    <ul className="divide-y divide-gray-200">
                      {cart.cartItems.map((item, index) => (
                        <li key={index} className="py-4 px-6 flex items-center">
                          <div className="flex items-center flex-1">
                            <div className="flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.Name}
                                className="h-10 w-10 rounded-md object-cover"
                              />
                            </div>
                            <div className="ml-3">
                              <Link
                                to={`/product/${item.product}`}
                                className="text-lg font-medium text-gray-900"
                              >
                                {item.Name}
                              </Link>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg font-medium text-gray-900">
                              {item.qty} x ${item.price.toFixed(0)} = $
                              {item.qty * item.price.toFixed(0)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </p>
            </li>
          </ul>
        </div>

        <div className=" flex md:w-1/3 mb-10">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <ul className="list-none">
              <li className="flex justify-between py-2">
                <span className="text-gray-600">Items:</span>
                <span className="text-gray-800">${cart.itemsPrice}</span>
              </li>
            </ul>
            <ul className="list-none">
              <li className="flex justify-between py-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-gray-800">${cart.shippingPrice}</span>
              </li>
            </ul>
            <ul className="list-none">
              <li className="flex justify-between py-2">
                <span className="text-gray-600">Tax:</span>
                <span className="text-gray-800">${cart.taxPrice}</span>
              </li>
            </ul>
            <ul className="list-none">
              <li className="flex justify-between py-2">
                <span className="text-gray-600">Total:</span>
                <span className="text-gray-800">${cart.totalPrice}</span>
              </li>
            </ul>
            <div className="bg-white shadow sm:rounded-lg">
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <Message variant="danger">{error}</Message>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className={`w-full md:w-auto px-4 py-2 rounded-md text-white font-medium ${
                  cart.cartItems === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
