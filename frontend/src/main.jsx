import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import App from "./App";

const savedTheme = localStorage.getItem("sqms-theme");
const isDarkTheme = savedTheme === "dark";

document.documentElement.classList.toggle("dark", isDarkTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme={isDarkTheme ? "dark" : "light"}
      />
    </BrowserRouter>
  </React.StrictMode>
);