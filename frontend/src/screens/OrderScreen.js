import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ListGroup } from "react-bootstrap";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    // calculate price
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(0);
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&locale=en_US`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2 className="text-3xl underline font-bold mt-4">Order {order._id}</h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full md:w-8/12">
          <ul className="list-none">
            <li className="border-b border-gray-300 mb-4 pb-4">
              <h2 className="text-2xl font-bold mb-2 mt-4">Shipping</h2>
              <p>
                <strong className="font-bold">Name:</strong>
                {order.user.Name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p className="text-lg font-medium">
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalcode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </li>
          </ul>
        </div>

        <div className="w-full md:w-8/12">
          <ul className="list-none">
            <li className="border-b border-gray-300 mb-4 pb-4">
              <h2 className="text-2xl font-bold mb-2">Payment Method</h2>
              <p className="text-lg font-medium">
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </li>
          </ul>
        </div>

        <div className="w-full md:w-8/12">
          <ul className="list-none">
            <li className="border-b border-gray-300 mb-4 pb-4">
              <h2 className="text-2xl font-bold mb-2">Order Items</h2>
              <p className="text-lg font-medium">
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty!</Message>
                ) : (
                  <div className="bg-white rounded-lg shadow-md">
                    <ul className="divide-y divide-gray-200">
                      {order.orderItems.map((item, index) => (
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
                <span className="text-gray-800">${order.itemsPrice}</span>
              </li>
            </ul>
            <ul className="list-none">
              <li className="flex justify-between py-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-gray-800">${order.shippingPrice}</span>
              </li>
            </ul>
            <ul className="list-none">
              <li className="flex justify-between py-2">
                <span className="text-gray-600">Tax:</span>
                <span className="text-gray-800">${order.taxPrice}</span>
              </li>
            </ul>
            <ul className="list-none">
              <li className="flex justify-between py-2">
                <span className="text-gray-600">Total:</span>
                <span className="text-gray-800">${order.totalPrice}</span>
              </li>
            </ul>
          </div>

          {!order.isPaid && (
            <div className="border p-4">
              {loadingPay && <Loader />}
              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                ></PayPalButton>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
