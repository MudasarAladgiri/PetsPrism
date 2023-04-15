import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const Navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    Navigate("/login/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    Navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-2xl font-bold mt-8 mb-3">Payment Method</h1>
      <form onSubmit={submitHandler} className="container">
        <div className="my-4 ">
          <label as="legend" className="block font-medium mb-2">
            Select Method
          </label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                id="Paypal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label for="Paypal" className="font-medium">
                Paypal or Credit Card
              </label>
            </div>
          </div>

          <div className="flex flex-col space-y-2 mt-5">
            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                id="RazorPay"
                name="paymentMethod"
                value="RazorPay"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label for="RazorPay" className="font-medium">
                Razor Pay(Coming Soon)
              </label>
            </div>
          </div>
        </div>

        {/* <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
        </Form.Group>
        <Col>
        <Form.Check type="radio" label="Paypal or Credit Card" id="Paypal"
        name="paymentMethod" value="PayPal" checked 
        onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>

<Form.Check type="radio" label="Stripe" id="Stripe"
        name="paymentMethod" value="Stripe"  
        onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
        </Col> */}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Coutinue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
