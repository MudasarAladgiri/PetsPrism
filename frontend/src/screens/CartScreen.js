import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";

import { addToCart, removeFromCart } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const CartScreen = () => {
  const location = useLocation();
  const { id: productId } = useParams();
  const Navigate = useNavigate();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  // console.log(qty);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    Navigate("/login?redirect=shipping");
  };
  return (
    <div className=" container mx-auto mt-8 ">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="flex justify-end mt-8 shadow-lg">
        <div className="flex flex-col w-full max-w-md">
          <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-md">
            <h2 className="text-lg font-medium mb-4">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
              items)
            </h2>
            <h3 className="text-lg font-semibold mb-4">
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </h3>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg w-full transition duration-300"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <div className="flex flex-col">
          {cartItems.map((item) => (
            <div
              key={item.product}
              className="border border-gray-300 rounded-md mb-4"
            >
              <div className="flex items-center p-4">
                <div className="w-1/4">
                  <img
                    src={item.image}
                    alt={item.Name}
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-1/4">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-gray-900 hover:underline transition duration-300"
                  >
                    {item.Name}
                  </Link>
                </div>
                <div className="w-1/4">${item.price}</div>
                <div className="w-1/4">
                  <select
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInstock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/4">
                  <button
                    type="button"
                    className="text-red-500 ml-6 hover:text-red-600"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartScreen;
