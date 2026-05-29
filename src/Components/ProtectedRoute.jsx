import { Children } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ Children }) {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    alert("You can't access dashboard right now, please login!");
    return <Navigate to="/login" />;
  }

  return Children;
}

export default ProtectedRoute;
