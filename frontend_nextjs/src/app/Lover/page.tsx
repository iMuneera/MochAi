'use client';
import React, { useEffect, useState } from 'react';
import Cookies from '../component/cookies';

export default function LoverPage() {
  const [name, setName] = useState<string>('');
  const [result, setResult] = useState<{ message: string; status: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // Prevent hydration mismatch

  // Ensures the component renders only after client hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/submit_name/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        console.log("Response data:", data); // Log the response data
      } else {
        console.error("Error submitting name");
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering on server to avoid hydration issues
  if (!hasMounted) return null;

  return (
    <>
      <Cookies />
      <div>
        <h1 className="text-5xl text-[#5e42ae] font-bold text-center mt-10">
          Lover 1
        </h1>

        <form className="flex justify-center mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block mx-auto mt-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>

        <div className="mt-6 text-center text-gray-900 ">
          {loading && <p>Loading...</p>}
          {result && (
            <div className="text-lg font-semibold mt-4">
              <p>{result.message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
