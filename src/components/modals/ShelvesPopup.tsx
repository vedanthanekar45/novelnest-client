import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

import CreateShelf from "./createShelf";

interface ModalProps {
    isOpen: boolean;
    bookId?: string;
    onClose: () => void;
};

interface Shelf {
    id: number;
    title: string;
}


export default function ShelvesPopup({ isOpen, bookId, onClose }: ModalProps) {
    if (!isOpen) return null
    const navigate = useNavigate()
    const location = useLocation()
    const { loggedIn } = useAuth()
    const [showNewShelfPopup, setShowNewShelfPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [shelves, setShelves] = useState<Shelf[]>([])
    const [selectedShelves, setSelectedShelves] = useState<number[]>([]);


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


    const handleAddToShelves = async () => {
        const token = localStorage.getItem('token')
        const book_id = bookId

        try {
            await Promise.all(
                selectedShelves.map(async (shelfId) => {
                    const res = await axios.post(`http://127.0.0.1:8000/add_book_to_shelf/?id=${book_id}&shelf_id=${shelfId}`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    if (res.data.message === "Book already exists on this shelf.") {
                        alert(`Book already exists in shelf ID ${shelfId}`);
                    } else {
                        alert(`Book added to shelf ID ${shelfId}`);
                    }
                }
                ))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm 
            z-40 duration-300 transition-opacity duration-300 ease-in-out opacity-100 backdrop-brightness-50">
                <div className="bg-[#1c1c1c] rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl">
                        ✕
                    </button>
                    <h2 className="text-2xl prata mb-10 ml-2">Choose a Shelf</h2>

                    <form onSubmit={handleAddToShelves}>
                        {shelves.map((shelves) => (
                            loading ? (
                                <div key={shelves.id}>
                                    <hr className="mb-4 mt-4 border-gray-700" />
                                    <Tailspin size="40" stroke="5" speed="0.9" color="black" />
                                </div>
                            ) : (
                                <div key={shelves.id}>
                                    <hr className="mb-4 mt-4 border-gray-700" />
                                    <div className="flex justify-between items-center w-full">
                                        <label className="text-xl prata pl-2">{shelves.title}</label>
                                        <input type="checkbox"
                                            className="form-checkbox h-5 w-5 text-green-600"
                                            onChange={(e) => {
                                                const id = shelves.id
                                                if (e.target.checked) setSelectedShelves((prev) => [...prev, id])
                                                else setSelectedShelves((prev) => prev.filter((shelfId) => shelfId !== id))
                                            }} />
                                    </div>
                                </div>
                            )
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