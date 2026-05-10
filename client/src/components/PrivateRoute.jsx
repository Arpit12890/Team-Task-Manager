// ==========================================
// src/components/PrivateRoute.jsx
// ==========================================

import {
    Navigate
  } from "react-router-dom";
  
  function PrivateRoute({
    children
  }) {
  
    const token =
      localStorage.getItem(
        "token"
      );
  
    // IF NOT LOGGED IN
  
    if (!token) {
  
      return <Navigate to="/" />;
  
    }
  
    // IF LOGGED IN
  
    return children;
  
  }
  
  export default PrivateRoute;