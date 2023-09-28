import { createBrowserRouter } from "react-router-dom";
import MainLyout from "../layouts/MainLyout";
import ErrorPage from "../error-page/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import HeroRegister from "../pages/hero-register/HeroRegister";

const Root = createBrowserRouter([
    {
        path: `/`,
        element: <MainLyout></MainLyout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: `/`,
                element: <Home></Home>
            },
            {
                path: `/login`,
                element: <Login></Login>
            },
            {
                path: `/register`,
                element: <Register></Register>
            },
            {
                path: `/hero-register`,
                element: <HeroRegister></HeroRegister>
            },
        ]
    }
]) 

export default Root;