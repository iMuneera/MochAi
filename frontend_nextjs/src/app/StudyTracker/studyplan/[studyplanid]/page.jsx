'use client';
import { useState, useEffect } from "react";
import React from "react";
import CompletePlan from "../complete";

export default function Studyplan({ params }) {
       const unwrappedParams = React.use(params);
    const { studyplanid } = unwrappedParams;

    const [studyPlans, setStudyPlans] = useState([]); 
    const [currentPlan, setCurrentPlan] = useState(null); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handlePlanComplete = (completedPlanId, completedPlanData) => {
        setStudyPlans(prev => prev.filter(plan => plan.id !== completedPlanId));
        // If you want to update the currentPlan when completed
        setCurrentPlan(completedPlanData);
    };

    useEffect(() => {
        const fetchStudyPlan = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/get_studyPlan/');
                const data = await response.json();
                setStudyPlans(data.studyPlan);
                
                const foundPlan = data.studyPlan.find(plan => 
                    plan.id.toString() === studyplanid
                );
                
                if (foundPlan) {
                    setCurrentPlan(foundPlan);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching study plans:', error);
            } finally {
                setLoading(false);
            }
        };

        if (studyplanid) {
            fetchStudyPlan();
        }
    }, [studyplanid]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            </div>
        );
    }

    if (!currentPlan) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600">Study plan not found</div>
            </div>
        );
    }


   return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold">{currentPlan.subject}</h1>
                            <span className="inline-block bg-white text-blue-600 text-xs px-2 py-1 rounded-full font-semibold uppercase">
                                {currentPlan.proficiency_level}
                            </span>
                        </div>
                        <p className="mt-2 text-blue-100">{currentPlan.goal}</p>
                    </div>
                    
                    {/* Card Body */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Details</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Started: {new Date(currentPlan.start_date).toLocaleDateString()}</span>
                                    </li>
                                    {currentPlan.completed_date && (
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Completed: {new Date(currentPlan.completed_date).toLocaleDateString()}</span>
                                        </li>
                                    )}
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Status: {currentPlan.completed ? "Completed" : "In Progress"}</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Progress</h2>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className={`h-2.5 rounded-full ${currentPlan.completed ? 'bg-green-500' : 'bg-blue-500'}`} 
                                        style={{ width: currentPlan.completed ? '100%' : '50%' }}
                                    ></div>
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    {currentPlan.completed ? 
                                        "You've successfully completed this study plan!" : 
                                        "Keep going! You're making progress."}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Card Footer */}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
                            Edit Plan
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                            {currentPlan.completed ? 'Review' :
                         <CompletePlan
                                planId={currentPlan.id} 
                                onComplete={handlePlanComplete} 
                            />
                            
                            
                            }
                        </button>
                    </div>
                </div>
                
             
                
            </div>
        </div>
    );
}