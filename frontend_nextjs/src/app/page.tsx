"use client"; // for Next.js App Router
import { useEffect, useState } from "react";
import TypingHeader from "./component/TypingHeader";
import MockUpFE, { MockUpBE, MockUpLastLine } from "./component/Mockup";
import BlogSection from "./component/Blog";



export default function Home() {
  interface Data {
    message: string;
    status: string;
  }

  const [data, setData] = useState<Data | null>(null);




  useEffect(() => {


    // Fetch other data from the API
    fetch("http://127.0.0.1:8000/send_data/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
   
<main >
  <section id="home" className=" flex items-center justify-center min-h-screen ">
    {/* Main Content */}
    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-6 py-20">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 space-y-6">
        <TypingHeader />
        
        <p className="mt-4 text-gray-300 text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
          We're pioneering the future of AI with solutions that adapt, learn, and evolve. Experience the next generation of intelligent technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all hover:shadow-lg hover:shadow-purple-500/30">
            Get Started
          </button>
          <button className="px-8 py-3.5 rounded-lg border border-gray-700 hover:border-gray-600 text-white font-medium transition-all hover:bg-gray-800/50">
            Learn More
          </button>
        </div>
      </div>

      {/* Image Section with Floating Effect */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-20 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-gray-800/50"></div>
          <img
            src="/landing1.png"
            alt="AI Robot Looking to the Future"
            className="relative h-[600px] w-auto max-w-full object-contain drop-shadow-[0_25px_35px_rgba(139,92,246,0.3)] hover:drop-shadow-[0_25px_35px_rgba(59,130,246,0.4)] transition-all duration-500"
          />
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-blue-400 rounded-full filter blur-md animate-pulse"></div>
        </div>

      </div>
   
    </div>
 
  </section>
  <section className=" py-12"> {/* Added container with background */}
  <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4 text-center">
    How to set it up ?
  </h1>

  <div className="flex flex-col items-center text-white">
    <div className="flex space-x-36 justify-center">
      <MockUpFE />
      <MockUpBE />
    </div>
    <div className="flex justify-center">
      <MockUpLastLine />
    </div>
  </div>
</section>
<div className="min-h-screen">  
  <BlogSection />
   </div>
        
</main>



  );
}
