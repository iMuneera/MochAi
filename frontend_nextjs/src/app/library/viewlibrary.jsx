import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';

export default function ViewLibrary() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        setLoading(true);
        fetch('http://localhost:8000/viewlibrary/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBooks(data.books);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    };

    const handleDelete = (bookId) => {
        if (window.confirm('Are you sure you want to delete this book from your library?')) {
            setDeletingId(bookId);
            fetch(`http://localhost:8000/viewlibrary/${bookId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
                    } else {
                        console.error('Failed to delete book');
                        throw new Error('Failed to delete book');
                    }
                })
                .catch((error) => {
                    console.error('Error deleting book:', error);
                })
                .finally(() => {
                    setDeletingId(null);
                });
        }
    };

    return (
        <div className="">
      
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            ) : books.length === 0 ? (
                <div className="text-center py-16 rounded-xl  max-w-2xl mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="text-2xl font-medium text-gray-400 mb-2">Your library is empty</h3>
                    <p className="text-lg text-gray-500">Search for books above to add them to your collection</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {books.map((book) => (
                        <div key={book.id} className="bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50">
                            <div className="mb-6 h-64 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                                {book.cover_url ? (
                                    <img
                                        src={book.cover_url}
                                        alt={`Cover of ${book.title}`}
                                        className="w-full h-full object-cover"
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
                                <p className="text-lg text-blue-400">by {book.author}</p>
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



                                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
                                <button
                                    onClick={() => handleDelete(book.id)}
                                    disabled={deletingId === book.id}
                                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors duration-200 flex items-center" 
                                    
                                >
                                    {deletingId === book.id ? (
                                        <>
                                            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            Delete
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            )}
        </div>
    );
}