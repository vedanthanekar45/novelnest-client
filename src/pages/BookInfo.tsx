import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

import Footer from '../components/homepage/Footer'
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

  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<bookType | null>(null);
  const [loading, setLoading] = useState(false)
  const [fadeIn, setFadeIn] = useState(false);

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
    const timeout = setTimeout(() => {
      setFadeIn(true)
    }, 50);
    return () => clearTimeout(timeout);
  }, [id])

  if (loading) return (
    <div className="grid place-items-center h-screen">
      <Tailspin size="50" stroke="2" speed="0.9" color="green" />
    </div>
  );

  if (!book || !book.volumeInfo) {
    return (
      <div className="grid place-items-center h-screen">
        <Tailspin size="50" stroke="2" speed="0.9" color="green" />
      </div>
    );
  }

  return (
    <div className={`${fadeIn ? "opacity-100" : "opacity-0"} flex flex-col items-center text-white
    min-h-screen transition-opacity duration-300 ease-in`}>
      <Banner />
      <Navbar className="flex absolute" />
      <div className="flex px-6 w-full max-w-5xl gap-10">
        {book.volumeInfo?.imageLinks?.thumbnail && (
          <img
            className="w-[211px] h-[300px] object-cover shadow-lg rounded-md"
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
        )}

        <div className="flex flex-col justify-start">
          <h1 className="prata text-4xl font-medium mb-4">{book.volumeInfo?.title || "Untitled"}</h1>
          <h3 className="prata text-xl text-gray-300 mb-16">{book.volumeInfo?.authors?.join(", ") || "Unknown Author"}</h3>
          <div className="text-xl text-gray-200" dangerouslySetInnerHTML={{ __html: book.volumeInfo?.description || "No description available." }} />
        </div>
      </div>
      <Footer />
    </div>
  )
}