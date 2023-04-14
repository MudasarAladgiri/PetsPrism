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
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import FoodScreen from "./screens/FoodScreen";
import ToyScreen from "./screens/ToyScreen";
import MedicineScreen from "./screens/MedicineScreen";
import AboutScreen from "./screens/AboutScreen";
import SearchBox from "./screens/SearchBox";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="flex justify-center">
          <div className="container mx-auto">
            <Routes>
              {/* <Route path="/search/:keyword" element={<Homescreen />} /> */}
              <Route path="/" element={<Homescreen />} />
              <Route path="/search/:keyword" element={<SearchBox />} />

              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/login/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />
              <Route
                path="/admin/product/:id/edit"
                element={<ProductEditScreen />}
              />
              <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
              <Route
                path="/admin/productlist"
                element={<ProductListScreen />}
              />
              <Route path="/admin/orderlist" element={<OrderListScreen />} />

              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
              <Route path="/food" element={<FoodScreen />} />
              <Route path="/toy" element={<ToyScreen />} />
              <Route path="/medicine" element={<MedicineScreen />} />
              <Route path="/About" element={<AboutScreen />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
