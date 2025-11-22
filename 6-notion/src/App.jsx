import { createContext, useState, useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Note from "./pages/Note";
import Layout from "./pages/Layout";
import WithAuth from "./pages/WithAuth";

export const UserContext = createContext(null);

let router = createBrowserRouter([
  {
    path: "/",
    // ! Protected route !
    element: (
      <WithAuth>
        <Layout />
      </WithAuth>
    ),
    children: [
      { path: "/notes", Component: Notes },
      { path: "/notes/:id", Component: Note },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    // Component: Login,
  },
]);

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
