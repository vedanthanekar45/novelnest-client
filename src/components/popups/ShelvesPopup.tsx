import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};


export default function ShelvesPopup({ isOpen, onClose}: ModalProps) {
    if (!isOpen) return null
    const navigate = useNavigate()
    const { loggedIn } = useAuth()

    if (!loggedIn) navigate('/signin', {state: {from: location.pathname}})

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    >
                        ✕
                    </button>
                    <form>
      <input type="text" placeholder="Username" className="block mb-2" />
      <input type="password" placeholder="Password" className="block mb-4" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Log In
      </button>
    </form>
                </div>
            </div>
        </>
    )
}