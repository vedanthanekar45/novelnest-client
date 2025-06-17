import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'
import axios from 'axios'

import Footer from '../components/homepage/Footer'
import Navbar from "../components/navigation/Navbar";
import { useAuth } from '../auth/useAuth'


type bookType = {
  id?: string;
  volumeInfo: {
    title?: string;
    subtitle?: string;
    authors?: string[];
    categories?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    description?: string;
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    maturityRating?: string;
  };
};

export default function BookInfo() {

  const { id } = useParams<{ id: string }>();
  const { loggedIn } = useAuth();
  const [book, setBook] = useState<bookType | null>(null);
  const [loading, setLoading] = useState(false)
  const [fadeIn, setFadeIn] = useState(false);
  const [read, setRead] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()


  const markAsRead = () => {
    if (!loggedIn) {
      navigate('/signin', {state: {from: location.pathname}})
    } else {
      const token = localStorage.getItem('token');
      axios.post("http://127.0.0.1:8000/log_book/", {
        "google_book_id": id,
        "title": book?.volumeInfo.title,
        "thumbnail_url": book?.volumeInfo.imageLinks?.smallThumbnail,
        "status": "completed"
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }).then(response => {
        if (response.status === 200) {
          console.log("Successful");
          setRead(true);
        }
      }).catch(error => {
        console.log("Error:", error);
      });
    }
  };


  // This useEffect is getting really big.

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

    const checkIfRead = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get(`http://127.0.0.1:8000/check_book_read/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRead(res.data.read);
      } catch (error) {
        console.error("Could not check read status:", error);
      }
    };
    checkIfRead();


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
      {/* <Banner /> */}
      <Navbar className="flex mb-20" />
      <div className="flex px-6 w-full max-w-5xl gap-10">
        <div className="flex flex-col items-center">
          {book.volumeInfo?.imageLinks?.thumbnail && (
            <img
              className="w-[211px] h-[300px] object-cover shadow-lg rounded-md mb-8"
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
            />
          )}
          <div className="flex flex-col w-[211px]">

            {read ?
              (<button className="prata bg-white text-[#0e660e] text-sm px-4 py-2 
              rounded-xl text-2xl h-10 shadow mb-4 border-5 border-[#0e660e]" onClick={markAsRead}>
                Read
              </button>) :
              (<button className="prata bg-[#0e660e] hover:bg-white text-white hover:text-[#0e660e] duration-500 text-sm px-4 py-2 
            rounded-xl text-2xl h-10 shadow mb-4 border-5 border-[#0e660e]" onClick={markAsRead}>
                Mark as Read
              </button>)
            }



            <button className="prata bg-[#0e660e] hover:bg-white text-white hover:text-[#0e660e] duration-500 text-sm px-4 py-2 
            rounded-xl text-2xl h-10 shadow mb-4">
              Add to TBR
            </button>
            <button className="prata bg-[#0e660e] hover:bg-white text-white hover:text-[#0e660e] duration-500 text-sm px-4 py-2 
            rounded-xl text-2xl h-10 shadow mb-4">
              Add to Custom Shelf
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-start">
          <h1 className="prata text-4xl font-medium mb-2">{book.volumeInfo?.title || "Untitled"}</h1>
          <hr className='border-gray-700 mb-4'></hr>
          <h3 className="prata text-xl italic text-gray-400 mb-10">"{book.volumeInfo?.subtitle || "No subtitle"}"</h3>
          <h3 className="prata text-xl mb-10">Author(s): {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}</h3>

          <h3 className="prata text-2xl mb-2">Description</h3>
          <hr className='border-gray-700 mb-8'></hr>
          <div className="text-xl text-gray-200 mb-20" dangerouslySetInnerHTML={{ __html: book.volumeInfo?.description || "No description available." }} />

          <h3 className="prata text-2xl mb-2">Other Details</h3>
          <hr className='border-gray-700 mb-4'></hr>
          <div>
            <ul className="text-xl">
              <li>Publisher: {book.volumeInfo?.publisher}</li>
              <li>Published Date: {book.volumeInfo?.publishedDate}</li>
              <li>Page Count: {book.volumeInfo?.pageCount}</li>
              <li>Maturity Rating: {book.volumeInfo?.maturityRating}</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}