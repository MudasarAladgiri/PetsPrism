import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu1, setShowMenu1] = useState(false);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleMenu1 = () => {
    setShowMenu1(!showMenu1);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold">
          Petsprism
        </Link>
        <div className="flex">
          <Link to="/cart" className="px-4 py-2">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>

          {userInfo ? (
            <div className="relative">
              <button
                className="block px-4 py-2 hover:text-gray-300 transition duration-150 ease-in-out focus:outline-none focus:bg-gray-600"
                onClick={toggleMenu}
              >
                {userInfo.Name} <i className="fa fa-caret-down"></i>
              </button>
              {showMenu && (
                <div className="absolute bg-white rounded-lg shadow-lg py-2 mt-1 text-left">
                  <Link
                    to="/profile"
                    onClick={toggleMenu}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white transition duration-150 ease-in-out"
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={() => {
                      toggleMenu();
                      logoutHandler();
                    }}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white transition duration-150 ease-in-out"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2">
              <i className="fas fa-user"></i> Sign In
            </Link>
          )}

          {userInfo && userInfo.isAdmin && (
            <div className="relative">
              <button
                className="block px-4 py-2 hover:text-gray-300 transition duration-150 ease-in-out focus:outline-none focus:bg-gray-600"
                id="adminmenu"
                aria-haspopup="true"
                onClick={toggleMenu1}
              >
                Admin <i className="fa fa-caret-down"></i>
              </button>
              <div
                className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                aria-labelledby="adminmenu"
              >
                {showMenu1 && (
                  <div className="py-1">
                    <Link to="/admin/userlist" onClick={toggleMenu1}>
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        Users
                      </a>
                    </Link>
                    <Link to="/admin/productlist" onClick={toggleMenu1}>
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        Products
                      </a>
                    </Link>
                    <Link to="/admin/orderlist" onClick={toggleMenu1}>
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        Orders
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
