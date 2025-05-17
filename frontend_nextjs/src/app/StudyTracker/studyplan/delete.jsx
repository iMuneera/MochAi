'use client'
import { useState } from 'react';

export default function Delete({ planId, onDeleteSuccess }) {
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteStudyPlan = async () => {
        setIsDeleting(true);
        setError(null);
        
        try {
            const response = await fetch(`http://localhost:8000/delete_studyPlan/${planId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete study plan');
            }

            // Call the success callback if deletion was successful
            if (onDeleteSuccess) {
                onDeleteSuccess(planId);
            }

        } catch (error) {
            setError(error.message);
            console.error('Error deleting study plan:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <div className="flex justify-end mt-4">
                {error && (
                    <p className="text-red-500 text-xs mr-2">{error}</p>
                )}
                <button
                    className="text-red-500 hover:text-red-400 text-sm font-medium disabled:opacity-50"
                    onClick={deleteStudyPlan}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    )
}