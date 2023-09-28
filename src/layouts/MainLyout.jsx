import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const MainLyout = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    );
};

export default MainLyout;