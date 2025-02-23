import Navbar from "../navigation/Navbar";

export default function CreateJournal() {
    return (
        <div className="flex flex-col items-center">
            <Navbar className="flex" />
            <h1 className="text-white text-4xl mt-24 prata">CREATE JOURNAL (ADMIN)</h1>
            <form className="mt-24 w-full flex flex-col items-center">
                <input type="text" placeholder="Title" className="border bg-black border-white text-white
                rounded-md w-1/2 h-16 px-4 text-xl prata" />
                <input type="text" placeholder="Username of the author" className="border bg-black border-white text-white
                rounded-md w-1/2 h-16 px-4 text-xl prata mt-10" />
                <textarea className="bg-black border border-white text-white prata mt-10 w-1/2 h-96 text-xl p-4
                rounded-lg" 
                placeholder="Your Content here.."/>
                <button className="mt-24 bg-green-800 hover:bg-green-600 text-white p-2 text-xl h-14 rounded-md w-1/6">
                    Submit
                </button>
            </form>
        </div>
    )
}