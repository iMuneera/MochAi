"use client";
import React, { useState, useEffect } from 'react';
export default function PlanNote({ params }) {
    const { studyplanid, noteid } = React.use(params);
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    console.log("StudyPlanID: ", studyplanid);
    console.log("NoteID: ", noteid);
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get_notes_by_id/${noteid}/`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch note');
                }
                const data = await response.json();
                console.log('NOTE DATA:', data);
                setNote(data);
                 setLoading(false);
            } catch (err) {
                setError(err.message);
            } 
        };

        if (noteid) {
            fetchNote();
        } else {
            setLoading(false);
        }
    }, [noteid]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
    
    if (error) return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
        </div>
    );
    
    if (!note) return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
            <p>No note selected</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-24">
            <div className="mb-6">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    Study Plan ID: {note.subject}
                </span>
                <h1 className="text-3xl font-bold text-gray-800 mt-4">{note.title}</h1>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                
                    <span>Created: {new Date(note.created_at).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="prose max-w-none">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Note Content</h3>
                    <div className="whitespace-pre-line text-gray-700">
                        {note.content}
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                
                    </div>
                    <div>
                        <span className="font-medium">Created At:</span> {new Date(note.created_at).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}