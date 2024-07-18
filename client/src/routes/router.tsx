import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AdminScreen } from "../screens/admin/admin";
import { AboutScreen } from "../screens/about/about";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>,
  },
  {
    path: "/admin",
    element: <AdminScreen />,
    errorElement: <div>404</div>,
  },
  {
    path: "/about",
    element: <AboutScreen />,
  },
]);
