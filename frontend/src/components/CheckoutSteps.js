import React from "react";
// import { Nav } from "react bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex mx-20 mt-4 sm:flex justify-center mb-4">
      <nav className="flex justify-center mb-4 mx-3">
        <div className="nav-item">
          {step1 ? (
            <Link to="/login">
              <a className="text-blue-500 font-medium hover:text-blue-600">
                Sign In
              </a>
            </Link>
          ) : (
            <a
              className="text-gray-500 font-medium cursor-not-allowed"
              disabled
            >
              Sign In
            </a>
          )}
        </div>
      </nav>

      <nav className="flex justify-center mb-4 mx-3">
        <div className="nav-item">
          {step2 ? (
            <Link to="/login/shipping">
              <a className="text-blue-500 font-medium hover:text-blue-600">
                Shipping
              </a>
            </Link>
          ) : (
            <a
              className="text-gray-500 font-medium cursor-not-allowed"
              disabled
            >
              Shipping
            </a>
          )}
        </div>
      </nav>

      <nav className="flex justify-center mb-4 mx-3">
        <div className="nav-item">
          {step3 ? (
            <Link to="/payment">
              <a className="text-blue-500 font-medium hover:text-blue-600">
                Payment
              </a>
            </Link>
          ) : (
            <a
              className="text-gray-500 font-medium cursor-not-allowed"
              disabled
            >
              Payment
            </a>
          )}
        </div>
      </nav>

      <nav className="flex justify-center mb-4 mx-3">
        <div className="nav-item">
          {step4 ? (
            <Link to="/place order">
              <a className="text-blue-500 font-medium hover:text-blue-600">
                Place Order
              </a>
            </Link>
          ) : (
            <a
              className="text-gray-500 font-medium cursor-not-allowed"
              disabled
            >
              Place Order
            </a>
          )}
        </div>
      </nav>
    </nav>

    // <Nav className="justify-content-center mb-4">
    //   <Nav.item>
    //     {step1 ? (
    //         <LinkContainer to="/login">
    //             <Nav.Link>Sign In</Nav.Link>
    //         </LinkContainer>
    //     ): <Nav.Link disabled>Sign In</Nav.Link>}
    //   </Nav.item>

    //   <Nav.item>
    //     {step1 ? (
    //         <LinkContainer to="/shipping">
    //             <Nav.Link>Shipping</Nav.Link>
    //         </LinkContainer>
    //     ): <Nav.Link disabled>Shipping</Nav.Link>}
    //   </Nav.item>

    //   <Nav.item>
    //     {step1 ? (
    //         <LinkContainer to="/payment">
    //             <Nav.Link>Payment</Nav.Link>
    //         </LinkContainer>
    //     ): <Nav.Link disabled>Payment</Nav.Link>}
    //   </Nav.item>

    //   <Nav.item>
    //     {step1 ? (
    //         <LinkContainer to="/placeorder">
    //             <Nav.Link>Place Order</Nav.Link>
    //         </LinkContainer>
    //     ): <Nav.Link disabled>Place Order</Nav.Link>}
    //   </Nav.item>
    // </Nav>
  );
};

export default CheckoutSteps;
