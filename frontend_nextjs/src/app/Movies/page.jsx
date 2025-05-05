'use client'
import React, { useState } from 'react'
import Cookies from '../component/cookies'

export default function Page() {
    const [movieInfo, setMovieInfo] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/submit_Movie/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Movie: inputValue }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setMovieInfo(responseData.movie_info);
            } else {
                setError('Failed to fetch movie information');
            }
        } catch (error) {
            setError('Error fetching movie information');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen ">
            <Cookies />
            
            {/* Main Container */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <section className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-gray-700 shadow-2xl">
                    <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                        MovieFinder 
                                    </h1>
                                    
                                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                            className="w-full md:w-96 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-200 text-white font-medium"
                                            placeholder="Search for a movie title..."
                                        />
                                        <button
                                            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                                            onClick={handleSubmit}
                                            disabled={loading || inputValue.trim() === ''}
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Searching...
                                                </span>
                                            ) : 'Search'}
                                        </button>
                                    </div>
                                    
                                    {error && (
                                        <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-center">
                                            {error}
                                        </div>
                                    )}
                                    
                                    {movieInfo && (
                                        <div className="mt-8 bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600 transition-all duration-300">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-shrink-0">
                                                    {movieInfo.poster ? (
                                                        <img
                                                            src={movieInfo.poster}
                                                            alt={`Poster for ${movieInfo.title}`}
                                                            className="w-48 h-64 object-cover rounded-lg shadow-lg border border-gray-600"
                                                        />
                                                    ) : (
                                                        <div className="w-48 h-64 bg-gray-600/50 rounded-lg flex items-center justify-center border border-gray-600">
                                                            <span className="text-gray-400">No poster available</span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="flex-grow">
                                                    <h2 className="text-2xl font-bold mb-2">{movieInfo.title}</h2>
                                                    
                                                    <div className="mb-6">
                                                        <h3 className="font-semibold text-gray-300 mb-1">Plot</h3>
                                                        <p className="text-gray-300">
                                                            {movieInfo.plot || 'No plot available.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>
            </div>
        </div>
    );
}