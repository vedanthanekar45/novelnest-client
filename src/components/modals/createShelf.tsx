import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type createShelfModalProps = {
    isOpen: boolean;
    onClose: () => void;
};


export default function CreateShelf({ isOpen, onClose }: createShelfModalProps) {
    if (!isOpen) return null

    const [shelfName, setShelfName] = useState("")
    const [shelfDescription, setShelfDescription] = useState("")

    const handleCreateShelf = async (e: any) => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        try {
            const response = await axios.post("http://127.0.0.1:8000/create_shelf/", {
                title: shelfName, description: shelfDescription
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log('Shelf created: ', response.data.message)
            toast.success("Shelf successfully created!")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm backdrop-brightness-50
            z-40 duration-300 transition-opacity duration-300 ease-in-out opacity-100">
                <div className="bg-[#1c1c1c] rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl">
                        ✕
                    </button>
                    <h2 className="text-2xl prata mb-2">Choose a Shelf</h2>
                    <hr className="mb-10 border-gray-700"></hr>

                    <form onSubmit={handleCreateShelf}>
                        <input type="text" onChange={(e) => setShelfName(e.target.value)} placeholder="Give a name to your shelf..."
                            className="prata bg-black text-white w-full h-12 p-4 mb-4" required></input>
                        <textarea placeholder="Give it a nice description..." onChange={(e) => setShelfDescription(e.target.value)}
                            className="prata bg-black text-white w-full h-48 p-4 mb-4"></textarea>
                        <button className="w-full h-10 bg-green-700 text-white mt-10 prata rounded-lg">Add</button>
                    </form>

                </div>
            </div>
        </div>
    )
}