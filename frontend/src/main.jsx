import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/Signup";
import ProductPage from "./landing_page/products/ProductPage"
import AboutPage from "./landing_page/about/AboutPage"
import SupportPage from "./landing_page/support/SupportPage"
import PricingPage from "./landing_page/pricing/PricingPage"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/product" element={<ProductPage />}></Route>
      <Route path="/pricing" element={<PricingPage />}></Route>
      <Route path="/support" element={<SupportPage />}></Route>
      <Route path="/about" element={<AboutPage />}></Route>
    </Routes>
  </BrowserRouter>,
);
