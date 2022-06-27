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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products/:item_id' element={<SingleItem />}></Route>
        <Route path='/users/:username' element={<Profile />}></Route>
        <Route path='/users/:username/basket' element={<Basket />}></Route>
        <Route path='/users/:username/orders' element={<Orders />}></Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
