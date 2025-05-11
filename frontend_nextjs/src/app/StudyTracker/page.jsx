'use client'
import React, { useState } from 'react'
import BasicSelect from './selects';
import TailwindDateTimePicker from './Calendar';
import Viewstudytracker from './Viewstudy';

function Page() {
  const [language, setLanguage] = useState('');
  const [goal, setGoal] = useState('');
  const [startdate, setStartdate] = useState(new Date());
  const [proficiency, setProficiency] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[studyupdated, setStudyUpdated] = useState(false);


  const handleSubmit = async () => {
    console.log({ language, goal, startdate, proficiency });
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/new_language/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          language, 
          goal,
          startdate, 
          proficiency 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        setStudyUpdated(!studyupdated); 
        setLanguage('');
        setGoal('');
        setStartdate(new Date());
        setProficiency('');
      } else {
        console.error('Error:', errorData);
        setError('Failed to create learning plan');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while creating the learning plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center py-24 h-screen '>
      <div className='w-full max-w-md space-y-6'>
        <h1 className='text-2xl font-bold text-white text-center mb-6'>Create Your Learning Plan</h1>
        
        <div className='space-y-4'>
          <div>
            <label htmlFor="language" className='block text-sm font-medium text-gray-300 mb-1'>
             Programming language You're Learning
            </label>
            <input
              id="language"
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-white"
              placeholder="e.g. Python, Java..."
              required
            />
          </div>

          <div>
            <label htmlFor="goal" className='block text-sm font-medium text-gray-300 mb-1'>
              Your Goal
            </label>
            <input 
              id="goal"
              type='text'
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-white"
              placeholder="e.g. ,Create a personal project , learn a new framework"
              required
            />
          </div>

          <div className='pt-2'>
            <label className='block text-sm font-medium text-gray-300 mb-2'>
              Starting date
            </label>
            <TailwindDateTimePicker 
              value={startdate} 
              onChange={(date) => setStartdate(date)}
            />
          </div>

          <div className='pt-2'>
            <label className='block text-sm font-medium text-gray-300 mb-2'>
              Difficulty Level
            </label>
            <BasicSelect 
              value={proficiency} 
              onChange={(value) => setProficiency(value)}
            />
          </div>
        </div>
  
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Saving...' : 'Save Plan'}
        </button>
        
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
          
      </div>
        <Viewstudytracker key={studyupdated} />
    </div>
  )
}

export default Page;