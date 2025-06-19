import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

import CreateShelf from "./createShelf";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
};

interface Shelf {
    id: number;
    title: string;
}


export default function ShelvesPopup({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null
    const navigate = useNavigate()
    const location = useLocation()
    const { loggedIn } = useAuth()
    const [showNewShelfPopup, setShowNewShelfPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [shelves, setShelves] = useState<Shelf[]>([])

    useEffect(() => {
        if (!loggedIn) navigate('/signin', { state: { from: location.pathname } })
        const token = localStorage.getItem("token"); // or however you store your access token
        axios.get("http://127.0.0.1:8000/get_user_shelves", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setShelves(res.data.shelves);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching shelves:", err);
                setLoading(false);
            });
    }, [])

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm 
            z-40 duration-300 transition-opacity duration-300 ease-in-out opacity-100 backdrop-brightness-50">
                <div className="bg-[#1c1c1c] rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl">
                        ✕
                    </button>
                    <h2 className="text-2xl prata mb-10 ml-2">Choose a Shelf</h2>

                    <form>
                        {shelves.map((shelves) => (
                            <>
                                <hr className="mb-4 mt-4 border-gray-700"></hr>
                                {loading ? (
                                    <Tailspin
                                        size="40" stroke="5" speed="0.9" color="black"
                                    />
                                ) : (
                                    <div key={shelves.id} className="flex justify-between items-center w-full">
                                        <label className="text-xl prata pl-2">{shelves.title}</label>
                                        <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
                                    </div>
                                )}

                            </>
                        ))}
                        <hr className=" mt-4 border-gray-700"></hr>
                        <a onClick={() => setShowNewShelfPopup(true)} href="#"><div className="hover:bg-[#3c3c3c] py-4 pl-2">
                            <h2 className="prata text-xl">Create a new shelf +  </h2>
                        </div></a>
                        <hr className="mb-4 border-gray-700"></hr>
                        <button className="w-full h-10 bg-green-700 text-white mt-10 prata rounded-lg">Add</button>
                    </form>
                    
                    <CreateShelf isOpen={showNewShelfPopup} onClose={() => setShowNewShelfPopup(false)} />

                </div>
            </div>
        </div>
    )
}