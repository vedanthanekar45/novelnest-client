import Banner from "../components/homepage/Banner"
import Navbar from "../components/navigation/Navbar"
import Footer from "../components/homepage/Footer"
import { Link } from "react-router-dom"
import React from 'react'

type bookType = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {
            thumbnail: string;
        };
        publishedDate?: string;
        categories?: string[];
        description?: string;
    };
};

export default function Search () {

    const [isLoading, setIsLoading] = React.useState(true)
    const [query, setQuery] = React.useState('');
    const [books, setBooks] = React.useState<bookType[]>([]);
    
        const searchBooks = async (searchQuery: string) => {
            setIsLoading(true);
            if (!searchQuery) return;
            try {
                const response = await fetch(`http://127.0.0.1:8000/search/?query=${query}`);
                const data = await response.json();
                setBooks(data.items || []);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const handleSearch = (e: React.FormEvent) => {
            e.preventDefault();
            searchBooks(query);
        }

        const truncateText = (text: string, maxLength: number) => {
            if (text.length <= maxLength) {
                return text;
            }
            return text.substring(0, maxLength) + '...';
        };

    return (
        <div className="flex flex-col items-center">
            <Banner />
            <Navbar className="flex absolute" />
            <h1 className="text-5xl ml-[20px] mb-32 italic text-center text-white prata">
                Search for your favourite books
            </h1>
            <form className="flex justify-center " onSubmit={handleSearch}>
                <input 
                    type='text' 
                    className='bg-black prata text-white w-[1000px] h-14 px-4 text-xl rounded-xl border border-white' 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search for books'
                />
                <button type='submit' className="bg-green-800 rounded-lg text-white prata w-[100px] ml-6">Search</button>
            </form>
            <div className="">
                {isLoading ? (
                    <p>Loading....</p>
                ) : (
                    <ul className="text-white">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Link to={`/book/${book.id}`}>
                                    <hr className="w-[1100px] mx-auto mb-8 mt-8 border-gray-700" />
                                    <div className="flex items-start mb-8">
                                        <img 
                                            src={book.volumeInfo.imageLinks?.thumbnail} 
                                            alt={book.volumeInfo.title} 
                                            className="w-[150px]"
                                        />
                                        <div className="ml-20 mt-4">
                                            <h3 className="text-3xl prata hover:text-green-600">{book.volumeInfo.title}</h3>
                                            <p className="prata mt-2 text-xl text-gray-400 hover:underline">{book.volumeInfo.authors?.join(', ')}</p>
                                            <p className="prata mt-4 text-xl text-gray-400">{book.volumeInfo.publishedDate}</p>
                                            <p className="prata mt-4 text-xl text-gray-400">{book.volumeInfo.categories}</p>
                                            <p className="prata mt-4 text-xl text-gray-400">{truncateText(book.volumeInfo.description || '', 95)}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                <hr className="w-[1100px] mx-auto mb-8 mt-8 border-gray-700" />
            </div>
            <Footer />
        </div>
    )
}