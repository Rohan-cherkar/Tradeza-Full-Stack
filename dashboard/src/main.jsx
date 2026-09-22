import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import Login from "../src/components/Login.jsx";
import Signup from "../src/components/Signup.jsx";
// import Auth from "../src/components/Auth.jsx";

import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Home />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
);
