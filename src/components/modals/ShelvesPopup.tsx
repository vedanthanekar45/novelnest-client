import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import CreateShelf from "./createShelf";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};


export default function ShelvesPopup({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null
    const navigate = useNavigate()
    const location = useLocation()
    const { loggedIn } = useAuth()
    const [showNewShelfPopup, setShowNewShelfPopup] = useState(false)

    useEffect(() => {
        if (!loggedIn) navigate('/signin', { state: { from: location.pathname } })
    }, [])

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-40 duration-300 transition-opacity duration-300 ease-in-out opacity-100">
                <div className="bg-[#1c1c1c] rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                        ✕
                    </button>
                    <h2 className="text-2xl prata mb-10">Choose a Shelf</h2>
                    <form>
                        <hr className="mb-4 border-gray-700"></hr>
                        <div className="flex justify-between items-center w-full">
                            <label className="text-xl prata pl-2">Remember Me</label>
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
                        </div>
                        <hr className=" mt-4 border-gray-700"></hr>
                        <a onClick={() => setShowNewShelfPopup(true)}><div className="hover:bg-[#3c3c3c] py-4 pl-2">
                            <h2 className="prata text-xl">Create a new shelf +  </h2>
                        </div></a>

                        <CreateShelf isOpen={showNewShelfPopup} onClose={() => setShowNewShelfPopup(false)}/>

                        <hr className="mb-4 border-gray-700"></hr>

                        <button className="w-full h-10 bg-green-700 text-white mt-10 prata rounded-lg">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}