import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa"

export default function Footer () {
    return (
        <>
            <div className="flex mb-6 mt-48">
                <a href="https://x.com/ThanekarVedant">
                    <div className="bg-[#242424] hover:bg-[#1a1a1a] duration-300 rounded-full w-12 h-12 mx-4 flex items-center">
                        <FaXTwitter className="text-[27px] text-white ml-[10px]" />
                    </div>
                </a>
                <a href="https://www.instagram.com/vedanthanekar/">
                    <div className="bg-[#242424] hover:bg-[#9e36ff] duration-300 rounded-full w-12 h-12 mx-4 flex items-center">
                        <FaInstagram className="text-[27px] text-white ml-[10px]" />
                    </div>
                </a>
                <a href="#">
                    <div className="bg-[#242424] hover:bg-[#2d47d8] duration-300 rounded-full w-12 h-12 mx-4 flex items-center">
                        <FaDiscord className="text-[27px] text-white ml-[10px]" />
                    </div>
                </a>
                <a href="#">
                    <div className="bg-[#242424] hover:bg-green-700 duration-300 rounded-full w-12 h-12 mx-4 flex items-center">
                        <FaWhatsapp className="text-[27px] text-white ml-[10px]" />
                    </div>
                </a>
            </div>
            <div className="text-white flex">
                <a href="#"><h3 className="mx-4 hover:underline ">Home</h3></a>
                <span>•</span>
                <a href="#"><h3 className="mx-4 hover:underline ">About</h3></a>
                <span>•</span>
                <a href="#"><h3 className="mx-4 hover:underline ">Terms</h3></a>
                <span>•</span>
                <a href="#"><h3 className="mx-4 hover:underline ">Privacy</h3></a>
                <span>•</span>
                <a href="#"><h3 className="mx-4 hover:underline ">Contact</h3></a>
            </div>
            <footer className="bg-[#0f0f0f] mt-2 text-white py-4 w-full text-center">
                <p>Powered by <a href="https://books.google.com" className="hover:underline">Google Books</a></p>
            </footer>
        </>
    )
}