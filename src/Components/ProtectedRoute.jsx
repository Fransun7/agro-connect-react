// import { Children } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
// getting the authorization from local storage
  const isAuth = localStorage.getItem("isAuth");

  if (isAuth !== "true") {
    alert("You are not authorized to access the Dashboard, please Login")
    return <Navigate to="/login" replace />
  }

  return children

  

  return children;
}

export default ProtectedRoute;
