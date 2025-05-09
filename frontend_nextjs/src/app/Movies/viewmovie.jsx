import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import BasicModal from '../component/BasicModal';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';

export default function ViewMovie() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);



    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/viewmovie/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();
            setMovies(data.movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMovies();
    }, []);

    const handleDelete = async (movieId) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            setDeletingId(movieId);
            try {
                const response = await fetch(`http://localhost:8000/viewmovie/${movieId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete movie');
                }

                // Optimistic update - remove the movie immediately
                setMovies(prev => prev.filter(movie => movie.id !== movieId));
            } catch (error) {
                console.error('Error deleting movie:', error);
                // If error occurs, refetch to restore correct state
                fetchMovies();
            } finally {
                setDeletingId(null);
            }
        }
    };

    const handleReviewUpdate = (movieId, review) => {
        setMovies(prevMovies =>
            prevMovies.map(movie =>
                movie.id === movieId
                    ? {
                        ...movie,
                        review: review.content || review,
                        rating: review.rating

                    } : movie
            )
        );
    };

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">My Shows Collection</h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
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
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '';
                                                    e.target.parentElement.classList.add('bg-gray-700');
                                                }}
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

                                    {movie.review && (
                                        <div className="mt-3 p-3 bg-gray-700/50 rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <p className="text-gray-200 text-sm">{movie.review}</p>
                                                <BasicModal
                                                    itemId={movie.id}
                                                    itemName={movie.title}
                                                    itemcover={movie.poster}
                                                    type="movie"
                                                    existingReview={{ content: movie.review, rating: movie.rating }}
                                                    onReviewUpdate={(review) => handleReviewUpdate(movie.id, review)}
                                                    trigger={
                                                        <button className="text-blue-400 hover:text-blue-300">
                                                            <EditIcon fontSize="small" />
                                                        </button>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center mt-3">
                                        <Rating
                                            name="read-only"
                                            value={movie.rating || 0}
                                            readOnly
                                            precision={0.5}
                                            size="medium"
                                        />
                                        {movie.rating && (
                                            <span className="ml-2 text-gray-300">
                                                {movie.rating.toFixed(1)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                                    {!movie.review && (
                                        <BasicModal
                                            itemId={movie.id}
                                            itemName={movie.title}
                                            itemcover={movie.poster}
                                            type="movie"
                                            existingReview={{ content: movie.review, rating: movie.rating }}
                                            onReviewUpdate={(review) => handleReviewUpdate(movie.id, review)}
                                            trigger={
                                                <button className="text-blue-400 hover:text-blue-300">
                                                    <EditIcon fontSize="small" />
                                                </button>
                                            }
                                        />

                                    )}

                                    <button
                                        onClick={() => handleDelete(movie.id)}
                                        disabled={deletingId === movie.id}
                                        className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-red-900/20"
                                        title="Delete"
                                    >
                                        {deletingId === movie.id ? (
                                            <CircularProgress size={16} color="inherit" />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
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