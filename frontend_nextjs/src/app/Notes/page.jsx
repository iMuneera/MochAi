// app/create-note/CreateNotePage.jsx
'use client';
import { useState } from 'react';
import StudyPlanSelect from './List';

export default function CreateNotePage() {
  const [formData, setFormData] = useState({
    studyid: '',
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStudyPlanSelect = (selectedPlans) => {
    if (selectedPlans.length > 0) {
      setFormData(prev => ({
        ...prev,
        studyid: selectedPlans[0].id
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        studyid: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const form = new FormData();
      form.append('studyid', formData.studyid);
      form.append('title', formData.title);
      form.append('content', formData.content);

      const response = await fetch('http://localhost:8000/create_note/', {
        method: 'POST',
        body: form
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create note');
      }

      setSuccess(`Note created successfully! Note ID: ${data.note_id}`);
      setFormData({
        studyid: '',
        title: '',
        content: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create New Note</h1>
            <p className="mt-2 text-sm text-gray-600">
              Add a new note to your study tracker
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
           
              <StudyPlanSelect onSelectionChange={handleStudyPlanSelect} />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Note Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Note Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={5}
                value={formData.content}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !formData.studyid}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${!formData.studyid ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : 'Create Note'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}