import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Basket from "./components/Basket/Basket";
import Orders from "./components/Orders/Orders";
import SingleItem from "./components/SingleItem/SingleItem";
import Checkout from "./components/Checkout/Checkout";
import SucceedCheckout from "./components/Checkout/CheckoutSuccessful/SucceedCheckout";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products/:item_id' element={<SingleItem />}></Route>
        <Route path='/users/:id' element={<Profile />}></Route>
        <Route path='/users/:id/basket' element={<Basket />}></Route>
        <Route path='/users/:id/orders' element={<Orders />}></Route>
        <Route path='/users/:id/checkout' element={<Checkout />}></Route>
        <Route
          path='/users/:id/checkout-success'
          element={<SucceedCheckout />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
