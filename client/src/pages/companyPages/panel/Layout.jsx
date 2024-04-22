import React from "react";
import CustomAppBar from "./CustomAppBar";

const Layout = ({ children }) => {
  return (
    <div>
      <CustomAppBar />
      {children}
    </div>
  );
};

export default Layout;
