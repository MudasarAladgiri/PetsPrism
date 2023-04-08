// import logo from "./logo.svg";
// import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="flex justify-center">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Homescreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/login/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
