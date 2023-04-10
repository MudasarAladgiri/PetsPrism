import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import {Table, Buttonl} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { listOrders } from "../actions/orderActions";
const OrderListScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      Navigate("/login");
    }
  }, [dispatch, Navigate, userInfo]);

  return (
    <>
      <h1 className="text-2xl font-bold">Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  USER
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  DATE
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  TOTAL PRICE
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  PAID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  DELIVERED
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.user && order.user.Name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${order.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times text-red-500"></i>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times text-red-500"></i>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-2 rounded">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}{" "}
    </>
  );
};

export default OrderListScreen;
