import React, { useEffect, useState } from 'react';

export default function ViewMovie() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        setLoading(true);
        fetch('http://localhost:8000/viewmovie/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.movies);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
                setLoading(false);
            });
    };

    const handleDelete = (movieId) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            setDeletingId(movieId);
            fetch(`http://localhost:8000/viewmovie/${movieId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        fetchMovies(); // Refresh the list after deletion
                    } else {
                        console.error('Failed to delete movie');
                    }
                })
                .catch((error) => {
                    console.error('Error deleting movie:', error);
                })
                .finally(() => {
                    setDeletingId(null);
                });
        }
    };

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">My Movie Collection</h1>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : movies.length === 0 ? (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-400">Your library is empty</h3>
                    <p className="text-gray-500 mt-2">Search for movies above to add them to your collection</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <div key={movie.id} className="bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/30 relative group">
                            <div className="flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden mb-4">
                                        {movie.poster ? (
                                            <img
                                                src={movie.poster}
                                                alt={`Poster for ${movie.title}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-lg text-white line-clamp-2 mb-2">{movie.title}</h3>
                                    <p className="text-gray-300 text-sm line-clamp-3">{movie.description}</p>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
                                    <button
                                        onClick={() => handleDelete(movie.id)}
                                        disabled={deletingId === movie.id}
                                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors duration-200 flex items-center"
                                    >
                                        {deletingId === movie.id ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
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