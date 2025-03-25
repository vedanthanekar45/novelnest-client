import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function BookInfo () {

    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:8000/bookinfo/${id}/`);
            if (!response.ok) throw new Error("Failed to fetch book details");
            const data = await response.json();
            setBook(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false)
          }
        };
        fetchBookDetails();
    }, [id])

    if (loading) return <p>Loading book details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!book) return <p>No book details found.</p>;

    return (
        <div>
            <h1>{book.volumeInfo?.title}</h1>
            <h3>By {book.volumeInfo?.authors?.join(", ")}</h3>
            <img src={book.volumeInfo?.imageLinks?.thumbnail} alt={book.volumeInfo?.title} />
            <p>{book.volumeInfo?.description}</p>
        </div>
    )
}