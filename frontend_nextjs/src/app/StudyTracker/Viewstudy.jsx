import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


export default function Viewstudytracker() {
    const [studyPlan, setStudyPlan] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchStudyPlan = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/get_studyPlan/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch studyPlan');
            }

            const data = await response.json();
            setStudyPlan(data.studyPlan);
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
        <div className="p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">My Study Plans</h1>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : studyPlan.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-400">No study plans available.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {studyPlan.map((plan) => (
                        <div key={plan.id} className="bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/30">
                            <div className="flex flex-col h-full">
                                <h3 className="text-lg font-semibold text-white">{plan.subject}</h3>
                                <p className="text-gray-300 mt-2">Goal: {plan.goal}</p>
                                <p className="text-gray-400 text-sm mt-2">Start Date: {plan.start_date}</p>
                                <p className="text-gray-400 text-sm">Proficiency: {plan.proficiency_level}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}