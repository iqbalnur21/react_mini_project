import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import User from "../pages/User";
import UserDetails from "../pages/UserDetails";
import ProtectedRoute from "./ProtectedRoute";

const routeList = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <ProtectedRoute>
        <UserDetails />
      </ProtectedRoute>
    ),
  },
];

export default routeList;
