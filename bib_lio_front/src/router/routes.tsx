import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../pages/homePage";
import Dashboard from "../pages/Dashboard";
import Allbooks from "@/components/Allbooks";
import AddBook from "@/components/AddBook";
// import App from "../App";
// import { useAuth } from "react-oidc-context";
// import App from "../App";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home" />
    },
    {
        path: "/home",
        element: <HomePage />
    },
    {
        path: "/Dashboard",
        element: <Dashboard/>,
        children: [
            {
                path: "books/all",
                element: <Allbooks/>,
            },
            {
                path: "books/add",
                element: <AddBook/>,
            },
        ]

    }
]);

export default router