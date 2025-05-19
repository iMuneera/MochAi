'use client';
import { useState, useEffect } from "react";
import React from "react";
import CompletePlan from "../complete";
import Viewstudytracker from "../page";

export default function Studyplan({ params }) {
    const unwrappedParams = React.use(params);
    const { studyplanid } = unwrappedParams;

    const [studyPlans, setStudyPlans] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handlePlanComplete = (completedPlanId, completedPlanData) => {
        setStudyPlans(prev => prev.filter(plan => plan.id !== completedPlanId));
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
            }
            finally {
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
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className=" border-l-4 border-red-500 p-4 max-w-md w-full">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">Error: {error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentPlan) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Study plan not found</h3>
                    <p className="mt-1 text-sm text-gray-500">The requested study plan could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Study Plan
                    </h1>
                    <p className="mt-3 text-xl text-gray-200">
                        Track your learning progress
                    </p>
                </div>

                {/* Main Card with Conditional Styling */}
                <div className={`rounded-lg p-5 border transition-all duration-300 hover:shadow-lg h-full ${currentPlan.completed
                        ? 'bg-green-900/20 hover:bg-green-900/30 border-green-700/30 hover:shadow-green-500/10 hover:border-green-500/50'
                        : 'bg-red-900/20 hover:bg-red-900/30 border-red-700/30 hover:shadow-red-500/10 hover:border-red-500/50'
                    }`}>
                    {/* Card Header */}
                    <div className="text-white p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div>
                                <div className="flex items-center">
                                    <h1 className="text-2xl font-bold">{currentPlan.subject}</h1>
                                    <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-blue-700 uppercase">
                                        {currentPlan.proficiency_level}
                                    </span>
                                </div>
                                <p className="mt-2 text-blue-100 max-w-2xl">{currentPlan.goal}</p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentPlan.completed
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {currentPlan.completed ? 'Completed' : 'In Progress'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Details</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-lg text-gray-100">Start date</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {new Date(currentPlan.start_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </li>


                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-lg text-gray-100">Completion date</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {currentPlan.completed_date === null || currentPlan.completed_date === undefined
                                                    ? 'not completed yet'
                                                    : currentPlan.completed

                                                }


                                                {currentPlan.completed && currentPlan.completed_date
                                                    ? new Date(currentPlan.completed_date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })
                                                    : null}
                                            </p>
                                        </div>
                                    </li>



                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-indigo-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-lg text-gray-100">Time taken</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {currentPlan.time_taken !== null && currentPlan.time_taken !== undefined
                                                    ? (currentPlan.time_taken === 0
                                                        ? 'You finished this plan in the same day 🎉'
                                                        : `${currentPlan.time_taken} day${currentPlan.time_taken !== 1 ? 's' : ''}`)
                                                    : 'not completed yet'}
                                            </p>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div className="pb-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Progress</h2>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                                            <span>Completion</span>
                                            <span>{currentPlan.completed ? '100%' : '50%'}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className={`h-2.5 rounded-full ${currentPlan.completed ? 'bg-green-500' : 'bg-blue-500'
                                                    }`}
                                                style={{ width: currentPlan.completed ? '100%' : '50%' }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-lg ${currentPlan.completed
                                            ? 'bg-green-50'
                                            : 'bg-blue-50'
                                        }`}>
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg
                                                    className={`h-5 w-5 ${currentPlan.completed
                                                            ? 'text-green-400'
                                                            : 'text-blue-400'
                                                        }`}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className={`text-sm ${currentPlan.completed
                                                        ? 'text-green-700'
                                                        : 'text-blue-700'
                                                    }`}>
                                                    {currentPlan.completed
                                                        ? "🎉 You've successfully completed this study plan!"
                                                        : "💪 Keep going! You're making great progress."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 sm:px-8 flex justify-end">
                     
                            <a
                                href={`/StudyTracker/studyplan/${currentPlan.id}/notes/`}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                 View Notes
                                <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                    
                            <CompletePlan
                                planId={currentPlan.id}
                                onComplete={handlePlanComplete}
                            />
                      
                    </div>
                </div>

                <div className="mt-12">
                    <Viewstudytracker />
                </div>
            </div>
        </div>
    );
}