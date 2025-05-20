'use client'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useEffect } from 'react';
import CompletePlan from './complete';
import Delete from './delete';

export default function Viewstudytracker() {
    const [studyPlan, setStudyPlan] = useState([]);
    const [completedPlans, setCompletedPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[fullplans, setFullPlans] = useState([]);


    //When marking as complete	Moves from active → completed
    const handlePlanComplete = (completedPlanId, completedPlanData) => {
        setStudyPlan(prev => prev.filter(plan => plan.id !== completedPlanId));
        setCompletedPlans(prev => [completedPlanData, ...prev]);
    };


    //After successful deletion	Removes from both lists
    const handleDeleteSuccess = (deletedPlanId) => {
        setStudyPlan(prev => prev.filter(plan => plan.id !== deletedPlanId));
        setCompletedPlans(prev => prev.filter(plan => plan.id !== deletedPlanId));
    };


    const fetchStudyPlan = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/get_studyPlan/');

            if (!response.ok) {
                throw new Error('Failed to fetch study plans');
            }

            const data = await response.json();

            const fullPlans = data.studyPlan;
            setFullPlans(fullPlans);
            console.log("full",fullPlans);
            // Separate active and completed plans
            const activePlans = data.studyPlan.filter(plan => !plan.completed);
            const completedPlans = data.studyPlan.filter(plan => plan.completed);

            setStudyPlan(activePlans);
            setCompletedPlans(completedPlans);

        } catch (error) {
            setError(error.message);
            console.error('Error fetching study plans:', error);
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

                {error && (
                    <div className="mb-6 p-4 bg-red-900/50 text-red-300 rounded-lg">
                        Error: {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <CircularProgress style={{ color: '#3B82F6' }} />
                    </div>
                ) : studyPlan.length === 0 && completedPlans.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-64  rounded-xl">
                        <svg className="w-12 h-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="text-gray-400 text-lg">No study plans available</p>
                        <p className="text-gray-500 text-sm mt-1">Create your first study plan to get started</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-700">
                                <h2 className="text-xl font-bold text-white">
                                    Current Study Plans ({studyPlan.length})
                                </h2>
                                <span className="block w-16 h-1 bg-blue-500 rounded-full"></span>
                            </div>

                            {studyPlan.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {studyPlan.map((plan) => (

                                        <div key={plan.id} className="flex flex-col bg-blue-700/20 hover:shadow-blue-500/10 hover:border-blue-500/50 rounded-lg p-9 border border-gray-700 transition-all duration-300 hover:shadow-lg flex-grow">
                                            <a href={`/StudyTracker/studyplan/${plan.id}`}>
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
                                                            <span className="text-gray-400">Started:</span>
                                                            <span className="text-gray-300">
                                                                {new Date(plan.start_date).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-400">Proficiency:</span>
                                                            <span className="text-blue-400 font-medium">
                                                                {plan.proficiency_level}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="flex justify-between mt-4 space-x-9">
                                                <Delete
                                                    planId={plan.id}
                                                    onDeleteSuccess={handleDeleteSuccess}
                                                />
                                                <CompletePlan
                                                    planId={plan.id}
                                                    onComplete={handlePlanComplete}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-xl p-8">
                                    <p className="text-gray-400">No active study plans</p>
                                    <a href="/StudyTracker">
                                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                            Create a new study plan
                                        </button>
                                    </a>
                                </div>
                            )}
                        </div>

                        {completedPlans.length > 0 && (
                            <div className="mt-12">
                                <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-700">
                                    <h2 className="text-xl font-bold text-white">
                                        Completed Study Plans ({completedPlans.length})
                                    </h2>
                                    <span className="block w-16 h-1 bg-green-500 rounded-full"></span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {completedPlans.map((plan) => (
                                        <div
                                            key={plan.id}
                                            className="bg-green-900/20 hover:bg-green-900/30 rounded-lg p-5 border border-green-700/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:border-green-500/50 flex flex-col h-full "
                                        >
                                            <a  href={`/StudyTracker/studyplan/${plan.id}`} >
                                                <div className="flex items-center mb-3">
                                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                                    <h3 className="text-xl font-bold text-white">{plan.subject}</h3>
                                                </div>
                                                <p className="text-gray-300 mb-4 flex-grow">
                                                    <span className="font-medium text-gray-400">Goal: </span>
                                                    {plan.goal}
                                                </p>
                                                <div className="mt-auto space-y-2 pt-3 border-t border-green-700/30">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-400">Started:</span>
                                                        <span className="text-gray-300">
                                                            {new Date(plan.start_date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-400">Completed:</span>
                                                        <span className="text-gray-300">
                                                            {plan.completed_date ?
                                                                new Date(plan.completed_date).toLocaleDateString() :
                                                                'Not completed yet'}
                                                        </span>
                                                    </div>
                                                </div> 
 </a>
                                                 <Delete
                                                planId={plan.id}
                                                onDeleteSuccess={handleDeleteSuccess}
                                                className="hover:cursor-pointer"
                                            />
                                           
                                          
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}