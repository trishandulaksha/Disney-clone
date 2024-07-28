import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/LoginComponent/Login";
import Home from "./component/HomeComponent/Home";
import MainLayout from "./Layout/MainLayout";
import Description from "./component/FilmDescriptionComponenet/Description";

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
      {
        path: "/description/:id",
        element: <Description />,
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
