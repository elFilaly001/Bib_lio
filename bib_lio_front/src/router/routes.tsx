import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../pages/homePage";
// import App from "../App";
// import { useAuth } from "react-oidc-context";
// import App from "../App";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home" />
        // element: <App/>
    },
    {
        path: "/home",
        element: <HomePage />
    }
]);

export default router