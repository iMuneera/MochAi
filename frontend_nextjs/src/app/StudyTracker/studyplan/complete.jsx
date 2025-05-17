'use client'
import React from 'react'

export default function CompletePlan({ planId, onComplete }) {
    const completeStudyPlan = async () => {
        try {
            const response = await fetch(`http://localhost:8000/complete_studyPlan/${planId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to complete study plan');
            }

            const result = await response.json();
            onComplete(planId, result.study_plan);

        } catch (error) {
            console.error('Error completing study plan:', error);
            // You might want to handle this error in the parent component
            throw error;
        }
    };

    return (
        <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium"
            onClick={completeStudyPlan}
        >
            Mark as Complete
        </button>
    )
}