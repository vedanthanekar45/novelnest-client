import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

  console.log(book)

  if (loading) return <p className="text-white">Loading book...</p>;

  if (!book || !book.volumeInfo) {
    return <p className="text-white">Loading book info...</p>;
  }

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