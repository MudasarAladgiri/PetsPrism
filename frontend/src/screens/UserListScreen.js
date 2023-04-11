import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import {Table, Buttonl} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { listUsers, deleteUser } from "../actions/userActions";
const UserListScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      Navigate("/login");
    }
  }, [dispatch, Navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) dispatch(deleteUser(id));
  };
  return (
    <>
      <h1 class="text-2xl font-bold">Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div class="overflow-x-auto container">
          <table class="table-auto w-full border-collapse border border-gray-300 shadow-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  ID
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  NAME
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  EMAIL
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  ADMIN
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-300">
              {users.map((user) => (
                <tr key={user._id}>
                  <td class="px-6 py-4">{user._id}</td>
                  <td class="px-6 py-4">{user.Name}</td>
                  <td class="px-6 py-4">
                    <a
                      href={`mailto:${user.email}`}
                      class="text-blue-600 hover:underline"
                    >
                      {user.email}
                    </a>
                  </td>
                  <td class="px-6 py-4">
                    {user.isAdmin ? (
                      <i class="fas fa-check text-green-500"></i>
                    ) : (
                      <i class="fas fa-times text-red-500"></i>
                    )}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-2 rounded">
                        <i class="fas fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      class="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded ml-2"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UserListScreen;
