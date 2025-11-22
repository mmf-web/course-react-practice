import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../App";

export default function WithAuth({ children }) {
  const { user } = useContext(UserContext);
  return user?.id ? children : <Navigate to="/login" />;
}
