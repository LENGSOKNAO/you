import React from "react";
import HomeScreen from "./Screen/HomeScreen";
import { Route, Router, Routes } from "react-router-dom";
import Shopig from "./Screen/Shopig";
import Contact from "./Screen/Contact";
import About from "./Screen/About";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/shop" element={<Shopig />} />
        <Route path="/shop" element={<Shopig />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
