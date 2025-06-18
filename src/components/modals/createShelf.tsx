
type createShelfModalProps = {
    isOpen: boolean;
    onClose: () => void;
};


export default function CreateShelf ({ isOpen, onClose }: createShelfModalProps) {
    if (!isOpen) return null

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-40 duration-300 transition-opacity duration-300 ease-in-out opacity-100">
                <div className="bg-[#1c1c1c] rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                        ✕
                    </button>
                    <h2 className="text-2xl prata mb-2">Choose a Shelf</h2>
                    <hr className="mb-10 border-gray-700"></hr>
                    <input type="text" placeholder="Give a name to your shelf..." className="prata bg-black text-white w-full h-16 p-4"></input>
                    <button className="w-full h-10 bg-green-700 text-white mt-10 prata rounded-lg">Add</button>
                </div>
            </div>
        </div>
    )
}