import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

type bookType = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    description?: string;
  };
};

export default function BookInfo() {

  const { id } = useParams();
  const [book, setBook] = useState<bookType | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/bookinfo/${id}/`);
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();
        setBook(data.items ? data.items[0] : data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBookDetails();
  }, [id])

  return (
    <div className="text-white">
      <h1>{book.volumeInfo?.title || "Untitled"}</h1>
      <h3>By {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}</h3>
      {book.volumeInfo?.imageLinks?.thumbnail && (
        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
      )}
      <p>{book.volumeInfo?.description || "No description available."}</p>
    </div>
  )
}