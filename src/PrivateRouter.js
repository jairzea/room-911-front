/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Navigate } from "react-router-dom";

// eslint-disable-next-line import/prefer-default-export
export const PrivateRouter = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");

  return accessToken ? children : <Navigate to="/authentication/sign-in" />;
};
