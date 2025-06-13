import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

// Default values shown


import Navbar from "../components/navigation/Navbar";
import Banner from "../components/homepage/Banner";

type bookType = {
  id?: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
    description?: string;
  };
};

export default function BookInfo() {

  const { id } = useParams<{id: string}>();
  const [book, setBook] = useState<bookType | null>(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://127.0.0.1:8000/get_book_data/?id=${id}/`);
        console.log("Fetching book from:", `http://127.0.0.1:8000/bookinfo/${id}/`);
        const data = await response.json();
        setBook(data.items ? data.items[0] : data);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false)
      }
    };
    fetchBookDetails();
  }, [id])

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 50); // delay ensures CSS kicks in
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return (
    <div className="grid place-items-center h-screen">
      <Tailspin size="50" stroke="2" speed="0.9" color="green" />
    </div>
  );

  if (!book || !book.volumeInfo) {
    return <p className="text-white">Loading book info...</p>;
  }

  return (
  <div className={`flex flex-col items-center text-white transition-opacity duration-1000 ease-out ${fadeIn ? "opacity-100" : "opacity-0"}`}>
    <Banner />
    <Navbar className="flex absolute" />
    <div className="flex px-6 w-full max-w-5xl gap-10">
      {/* Book Thumbnail */}
      {book.volumeInfo?.imageLinks?.thumbnail && (
        <img
          className="w-[211px] h-[300px] object-cover shadow-lg rounded-md"
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
        />
      )}

      {/* Book Info */}
      <div className="flex flex-col justify-start">
        <h1 className="prata text-3xl font-semibold mb-2">{book.volumeInfo?.title || "Untitled"}</h1>
        <h3 className="prata text-xl text-gray-300 mb-4">{book.volumeInfo?.authors?.join(", ") || "Unknown Author"}</h3>
        <div className="text-sm text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: book.volumeInfo?.description || "No description available." }} />
      </div>
    </div>
  </div>
)


  // return (
  //   <div className={`flex flex-col items-center text-white transition-opacity duration-1000 ease-out ${fadeIn ? "opacity-100" : "opacity-0"}`}>
  //       <Banner />
  //       <Navbar className="flex absolute" />
  //       <div className="flex">
  //           {book.volumeInfo?.imageLinks?.thumbnail && (
  //               <img className="w-[211px] h-[300px]" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
  //           )}
  //           <div className=''>
  //               <h1 className='prata'>{book.volumeInfo?.title || "Untitled"}</h1>
  //               <h3 className='prata'>{book.volumeInfo?.authors?.join(", ") || "Unknown Author"}</h3>
  //               <p dangerouslySetInnerHTML={{__html: book.volumeInfo?.description || "No description available."}} />
  //           </div>
  //       </div>
  //   </div>
  // )
}