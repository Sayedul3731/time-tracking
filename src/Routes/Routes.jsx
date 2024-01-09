import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Page/Home/Home";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/Register",
                element: <Register></Register>
            },
            {
                path: "/Login",
                element: <Login></Login>
            }
        ],
    
    },
    {
        path: "Dashboard",
        element: <Dashboard></Dashboard>
    }
]);

export default router;