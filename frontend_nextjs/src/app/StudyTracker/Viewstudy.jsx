import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Viewstudytracker() {
    const [studyPlan, setStudyPlan] = useState([]);
    const [studycount, setStudyCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const deleteStudyPlan = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/delete_studyPlan/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete studyPlan');
            }
            // Refresh the list after deletion
            fetchStudyPlan();
        } catch (error) {
            console.error('Error deleting studyPlan:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStudyPlan = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/get_studyPlan/');
            
            if (!response.ok) {
                throw new Error('Failed to fetch studyPlan');
            }

            const data = await response.json();
            setStudyPlan(data.studyPlan);
            setStudyCount(data.subject_count);
        } catch (error) {
            console.error('Error fetching studyPlan:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudyPlan();
    }, []);

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-8 pb-2 border-b border-gray-700">
                    My Study Plans
                    <span className="block w-20 h-1 bg-blue-500 mt-2 rounded-full"></span>
                </h1>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <CircularProgress style={{ color: '#3B82F6' }} />
                    </div>
                ) : studyPlan.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-64 bg-gray-800/50 rounded-xl">
                        <svg className="w-12 h-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="text-gray-400 text-lg">No study plans available</p>
                        <p className="text-gray-500 text-sm mt-1">Create your first study plan to get started</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {studycount > 0 && (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 rounded-lg p-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30">
                                <h2 className="text-xl font-bold text-white mb-4">Total Study Plans: {studycount}</h2>
                            </div>
                        )}
                        {studyPlan.map((plan) => (
                            <div 
                                key={plan.id} 
                                className="bg-gray-800 hover:bg-gray-700 rounded-lg p-5 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center mb-3">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                        <h3 className="text-xl font-bold text-white">{plan.subject}</h3>
                                    </div>
                                    <p className="text-gray-300 mb-4 flex-grow">
                                        <span className="font-medium text-gray-400">Goal: </span>
                                        {plan.goal}
                                    </p>
                                    <div className="mt-auto space-y-2 pt-3 border-t border-gray-700">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Start Date:</span>
                                            <span className="text-gray-300">{plan.start_date}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Proficiency:</span>
                                            <span className="text-blue-400 font-medium">{plan.proficiency_level}</span>
                                        </div>
                                        <button 
                                            className="text-red-500 hover:text-red-700 text-sm mt-2"
                                            onClick={() => deleteStudyPlan(plan.id)}
                                        >
                                            Delete 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}