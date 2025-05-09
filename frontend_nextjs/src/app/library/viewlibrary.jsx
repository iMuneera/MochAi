import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import BasicModal from '../component/BasicModal';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function ViewLibrary() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/viewlibrary/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText || 'Failed to fetch books');
            }

            const data = await response.json();
            setBooks(data.books);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError(error.message || 'Failed to load library');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleReviewUpdate = (bookId, reviewData) => {
        setBooks(prevBooks =>
            prevBooks.map(book =>
                book.id === bookId ? { 
                    ...book, 
                    review: reviewData.content || reviewData,
                    rating: reviewData.rating 
                } : book
            )
        );
    };
    const handleDelete = async (bookId) => {
        if (!window.confirm('Are you sure you want to delete this book from your library?')) {
            return;
        }

        setDeletingId(bookId);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8000/viewlibrary/${bookId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText || 'Failed to delete book');
            }

            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        } catch (error) {
            console.error('Error deleting book:', error);
            setError(error.message || 'Failed to delete book');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <Alert severity="error" className="mb-4">
                    {error}
                    <Button onClick={fetchBooks} color="inherit" size="small" className="ml-2">
                        Retry
                    </Button>
                </Alert>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="text-center p-8 rounded-xl max-w-2xl mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-2xl font-medium text-gray-400 mb-4">Your library is empty</h3>
                <p className="text-lg text-gray-500">Search for books above to add them to your collection</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50">
                        <div className="mb-6 h-64 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                            {book.cover_url ? (
                                <img
                                    src={book.cover_url}
                                    alt={`Cover of ${book.title}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '';
                                        e.target.parentElement.classList.add('bg-gray-700');
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white line-clamp-2">{book.title}</h3>
                            <p className="text-md text-blue-400">by {book.author}</p>
                            <div className="flex items-center">
                                <Rating
                                    name="read-only"
                                    value={book.rating || 0}
                                    readOnly
                                    precision={0.5}
                                    size="medium"
                                />
                                {book.rating && (
                                    <span className="ml-2 text-gray-300">
                                        {book.rating.toFixed(1)}
                                    </span>
                                )}
                            </div>
                            {book.review && (
                                <div className="mt-3 p-3 bg-gray-700/50 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <p className="text-gray-200 text-sm">{book.review}</p>
                                        <BasicModal
                                            itemId={book.id}
                                            itemName={book.title}
                                            itemcover={book.cover_url}
                                            type="book"
                                            existingReview={{ content: book.review, rating: book.rating }}
                                            onReviewUpdate={(reviewContent) => handleReviewUpdate(book.id, reviewContent)}
                                            trigger={
                                                <button className="text-blue-400 hover:text-blue-300">
                                                    <EditIcon fontSize="small" />
                                                </button>
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                                {!book.review && (
                                    <BasicModal
                                        itemId={book.id}
                                        itemName={book.title}
                                        itemcover={book.cover_url}
                                        type="book"
                                        onReviewUpdate={(review) => handleReviewUpdate(book.id, review)}
                                        trigger={
                                             <button className="text-blue-400 hover:text-blue-300">
                                                <EditIcon fontSize="small" />
                                                </button>
                                        }
                                    />
                                )}

                                <button
                                    onClick={() => handleDelete(book.id)}
                                    disabled={deletingId === book.id}
                                    className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-red-900/20"
                                     title="Delete"
                                >
                                    {deletingId === book.id ? (
                                        <>
                                            <CircularProgress size={14} color="inherit" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                       
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}