import { Children } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // This effect listens to 'showPopup'. When it becomes true, it triggers a 3-second countdown.

  const isLoggedIn = false;

  // if (!isLoggedIn) {
  //   alert("You can't access dashboard right now, please login!");
  //   return <Navigate to="/login" />;
  // }

  return children;
}

export default ProtectedRoute;
