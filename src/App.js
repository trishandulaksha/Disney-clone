import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/LoginComponent/Login";
import Home from "./component/HomeComponent/Home";
import MainLayout from "./Layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
