'use client'
import React, { useState } from 'react'
import Cookies from '../component/cookies'
import ViewLibrary from './viewlibrary'

export default function Page() {
    const [bookInfo, setBookInfo] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [libraryStatus, setLibraryStatus] = useState(null);
    const [libraryUpdated, setLibraryUpdated] = useState(false); // New state for refresh trigger

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/submit_name/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: inputValue }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setBookInfo(responseData.book_info);
                setLibraryStatus(null);
            } else {
                setError('Failed to fetch book information');
            }
        } catch (error) {
            setError('Error fetching book information');
        } finally {
            setLoading(false);
        }
    };

    const addToLibrary = async () => {
        if (!bookInfo) return;
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/add_to_library/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: bookInfo.title,
                    author: bookInfo.author,
                    description: bookInfo.description || '',
                    cover_url: bookInfo.cover_url
                }),
            });

            if (response.ok) {
                setLibraryStatus('Book added successfully!');
                setLibraryUpdated(!libraryUpdated); // Trigger library refresh
                setBookInfo(null); // Clear current book info
                setInputValue(''); // Clear search input
            } else if (response.status === 202) {
                setLibraryStatus('Book already exists in your library!');
            }
        } catch (error) {
            setError('Error adding book to library');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen ">
            <Cookies />
            
            {/* Main Container */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Search Section */}
                <section className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-gray-700 shadow-2xl">
                    <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        BookFinder Pro
                    </h1>
                    
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                            className="w-full md:w-96 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            placeholder="Search for a book title..."
                        />
                        <button
                            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                            onClick={handleSubmit}
                            disabled={loading}
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
                    
                    {bookInfo && (
                        <div className="mt-8 bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600 transition-all duration-300">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    {bookInfo.cover_url ? (
                                        <img
                                            src={bookInfo.cover_url}
                                            alt={`Cover of ${bookInfo.title}`}
                                            className="w-48 h-64 object-cover rounded-lg shadow-lg border border-gray-600"
                                        />
                                    ) : (
                                        <div className="w-48 h-64 bg-gray-600/50 rounded-lg flex items-center justify-center border border-gray-600">
                                            <span className="text-gray-400">No cover available</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold mb-2">{bookInfo.title}</h2>
                                    <p className="text-lg text-blue-300 mb-4">by {bookInfo.author || 'Unknown author'}</p>
                                    
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-gray-300 mb-1">Description</h3>
                                        <p className="text-gray-300">
                                            {bookInfo.description || 'No description available.'}
                                        </p>
                                    </div>
                                    
                                    <button 
                                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                                        onClick={addToLibrary}
                                        disabled={loading}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                        </svg>
                                        Add to My Library
                                    </button>
                                </div>
                            </div>
                            
                            {libraryStatus && (
                                <div className={`mt-4 p-3 rounded-lg text-center ${libraryStatus.includes('already exists') ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'bg-green-500/20 border-green-500 text-green-300'}`}>
                                    {libraryStatus}
                                </div>
                            )}
                        </div>
                    )}
                </section>
                
                {/* Library Section */}
                <section className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-2xl">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        My Library
                    </h2>
                    <ViewLibrary key={libraryUpdated} /> {/* Key prop forces re-render */}
                </section>
            </div>
        </div>
    );
}