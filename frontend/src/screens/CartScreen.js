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

      <div className="flex justify-end mt-8 ">
        <div className="flex flex-col w-full max-w-md">
          <div className="bg-white p-4 rounded-lg border border-gray-300">
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg w-full"
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
                    className="text-gray-900  hover:underline"
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

    // <Row>
    //   <Col md={8}>
    //   <h1>Shopping Cart</h1>
    //   {cartItems.length===0? <Message>Your cart is empty <Link to="/">Go Back</Link></Message>:(
    //     <ListGroup variant="flush">
    //       {cartItems.map(item=>(
    //         <ListGroup.item key={item.product}>
    //           <Row>
    //             <Col md={2}>
    //             <image src={item.image} alt={item.Name} fluid rounded></image>
    //             </Col>
    //             <Col md={3}>
    //             <Link to={`/product/${item.product}`}>{item.Name}</Link>
    //             </Col>
    //             <Col ms={2}>
    //             ${item.price}
    //             </Col>

    //             <Col ms={2}>
    //           <Form.Control
    //           as ="select"
    //           value={item.qty}
    //           onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
    //             {[...Array(item.countInstock).keys()].map((x)=>(
    //             <option key={x+1 } value={x+1}>
    //              {x+1}
    //            </option>
    //             ))}
    //           </Form.Control>
    //             </Col>

    //             <Col md={2}>
    //             <Button type="button"
    //             variant="light"
    //             onClick={()=>removeFromCartHandler(item.product)}>
    //               <i className="fas fa-trash"></i>
    //             </Button>
    //             </Col>
    //           </Row>
    //         </ListGroup.item>
    //       ))}
    //     </ListGroup>
    //   )}
    //   </Col>
    //   <Col md={2}>
    //       <Card>
    //         <ListGroup variant="flush">
    //               <ListGroup.item>
    //                 <h2>Subtotal ({cartItems.reduce((acc,item) => acc+item.qty, 0)}) items</h2>
    //                 ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
    //               </ListGroup.item>
    //               <ListGroup.item>
    //                 <Button type="button" className="btn-block"
    //                 disabled={cartItems.length===0} onClick={checkoutHandler}> Proceed to Checkout</Button>
    //               </ListGroup.item>
    //         </ListGroup>
    //       </Card>
    //   </Col>
    // </Row>
  );
};

export default CartScreen;
