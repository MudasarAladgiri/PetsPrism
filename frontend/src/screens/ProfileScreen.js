import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
const ProfileScreen = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageVariant, setMessageVariant] = useState(null);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loaddinOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      Navigate("/login");
    } else {
      if (!user || !user.Name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.Name);
        setEmail(user.email);
      }
    }
  }, [dispatch, Navigate, userInfo, user]);

  useEffect(() => {
    if (success) {
      dispatch(getUserDetails("profile"));

      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      setMessage("Profile Updated!");
      setMessageVariant("success");
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageVariant("danger");
    } else {
      dispatch(updateUserProfile({ id: user._id, Name, email, password }));
    }
  };
  return (
    <div class="flex flex-wrap">
      <div class="md:w-1/4">
        <h2 className="text-2xl font-bold mt-8">User Profile</h2>
        {message && <Message variant={messageVariant}>{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}

        {/* {success && (
          <Message variant="success" class="text-green-600">
            Profile Updated
          </Message>
        )} */}

        {loading && <Loader />}
        <form onSubmit={submitHandler}>
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
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>

      <div class="md:w-3/4 font-bold mt-8">
        <h2 class="text-2xl font-bold">My Orders</h2>
        {loaddinOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <table class="w-full border-collapse border border-gray-300 shadow-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  ID
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  DATE
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  TOTAL
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  PAID
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  DELIVERED
                </th>

                <th class="px-6 py-3 text-left font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-300">
              {orders.map((order) => (
                <tr key={user._id}>
                  <td class="px-6 py-4">{order._id}</td>
                  <td class="px-6 py-4">{order.createdAt.substring(0, 10)}</td>
                  <td class="px-6 py-4">{order.totalPrice}</td>
                  <td class="px-6 py-4">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i class="fas fa-times text-red-500"></i>
                    )}
                  </td>

                  <td class="px-6 py-4">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i class="fas fa-times text-red-500"></i>
                    )}
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <Link to={`/order/${order._id}`}>
                      <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-2 rounded">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  //   <Row>
  //     <Col md={3}>
  //     </Col>
  //     <Col md={9}>
  //         <h2>My Orders</h2>
  //     </Col>
  //   </Row>
};

export default ProfileScreen;
