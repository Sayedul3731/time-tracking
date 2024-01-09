import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const Navbar = () => {
    const { logOut, user } = useContext(AuthContext)
    console.log(user);
    const navLinks = <>
        <li> <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-xl md:font-medium mr-4 underline" : "lg:text-xl md:font-medium mr-4"}>Home</NavLink> </li>
        <li> <NavLink to="/Dashboard" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-xl md:font-medium mr-4 underline" : "lg:text-xl md:font-medium mr-4"}>Dashboard</NavLink> </li>
        {
            user ? ' ' : <li> <NavLink to="/Register" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "lg:text-xl md:font-medium mr-4 underline" : "lg:text-xl md:font-medium mr-4"}>Join Now</NavLink> </li>
        }
    </>

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log out successfully!",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch()
    }
    return (
        <div className="navbar text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex justify-center items-center">
                    <img src="logoT.png" alt="" className="w-[70px] h-[70px]" />
                    <a className=" text-xl">TimeTracking</a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0}>{
                        user ? <img className="w-[50px] h-[50px] rounded-full" src={user?.photoURL} alt="" /> : ''
                    }</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-[#e2711d] rounded-box w-52 text-white">
                        <li>{user?.displayName}</li>
                        <Link to="Dashboard"><li className="my-2">Dashboard</li></Link>
                        <li onClick={handleLogOut} className="cursor-pointer">LogOut</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;