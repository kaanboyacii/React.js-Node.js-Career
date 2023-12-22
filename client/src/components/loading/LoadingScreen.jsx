// LoadingScreen.js
import React from "react";
import { FaSpinner } from "react-icons/fa";
import "./LoadingScreen.scss";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <FaSpinner className="loading-icon" />
      <h2>Loading...</h2>
    </div>
  );
};

export default LoadingScreen;
