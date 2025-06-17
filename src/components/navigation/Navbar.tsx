// The Navigation bar, short, simple and sweet

import Logo from "./Logo";
import NavButtons from "./NavButton";
import { ClassNameProp } from "../props/ClassNameProp.ts";
import { useAuth } from "../../auth/useAuth.ts";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({className}: ClassNameProp) {

    const { loggedIn, logout } = useAuth();
    const location = useLocation()
    return (
        <>
            <div className={className}>
                <a href="/"><Logo /></a>
                {
                    loggedIn ? (
                        <a><Link to="/signin" state={{ from: location.pathname }}><NavButtons className="text-white hover:text-[#24cf1e] prata font-medium 
                        ml-[300px] mt-[30px] text-[17px] trans" text="Account" /></Link></a>
                        ) : (<>
                            <a href="/signin"><NavButtons className="text-white hover:text-[#24cf1e] prata font*
                            ml-[400px] mt-[30px] text-[17px] trans" text="Sign In" /></a>
                             <a><Link to="/signup"><NavButtons className="text-white hover:text-[#24cf1e] prata font-medium 
                              ml-16 mt-[30px] text-[17px] trans" text="Register" /></Link></a>
                            </>
                        )
                }
                {/* <a href="/signin"><NavButtons className="text-white hover:text-[#24cf1e] prata font-medium 
                ml-[300px] mt-[30px] text-[17px] trans" text="Sign In" /></a> */}
                <a href="#"><NavButtons className="text-white hover:text-[#24cf1e] prata font-medium 
                ml-16 mt-[30px] text-[17px] trans" text="Library" /></a>
                <a href="#"><NavButtons className="text-white hover:text-[#24cf1e] prata font-medium 
                ml-16 mt-[30px] text-[17px] trans" text="Shelves" /></a>
                <a href="#"><NavButtons className="text-white hover:text-[#24cf1e] prata font-medium 
                ml-16 mt-[30px] text-[17px] trans" text="Journal" /></a>
                <a href="/searchbooks"><NavButtons className="text-white hover:text-[#24cf1e] prata font-medium 
                ml-16 mt-[30px] text-[17px] trans" text="Search" /></a>
                {
                    loggedIn ? (
                        <a href="#" onClick={logout}><NavButtons className="text-white hover:text-[#24cf1e] prata font-medium 
                        ml-16 mt-[30px] text-[17px] trans" text="Logout" /></a>
                    ) : (<></>)
                }

            </div>
        </>
    )
}