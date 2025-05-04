import React from "react";
import cmd from "../component/cmd"; // Importing cmd component
import CMD from "../component/cmd";
import MockUp from "./Mockup";
export default function BlogSection() {
  // Tech facts with dark theme appropriate content
  const techFacts = [
    "Next.js reduces TTI by 40% in production apps",
    "Django's ORM handles 15K+ queries/sec",
    "LLMs can now generate 90% accurate React code",
    "WebAssembly executes at near-native speed"
  ];

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      {/* Glow effects matching your main layout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-float1"></div>
        <div className="absolute right-1/4 bottom-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-float2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            Tech Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cutting-edge developments in modern web technologies
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Left Side Cards */}
          <div className="lg:w-5/12 space-y-10 relative">
            <BlogCard 
              title="Next.js 14 Performance"
              description="How server components and partial prerendering revolutionize React apps."
              fact={techFacts[0]}
              tag="Frontend"
              accent="purple"
            />
            
            <BlogCard 
              title="AI Integration Patterns"
              description="Best practices for implementing AI features in web applications."
              fact={techFacts[2]}
              tag="AI"
              accent="blue"
            />
          </div>

          {/* Right Side Cards */}
          <div className="lg:w-5/12 lg:ml-auto space-y-10 relative mt-10 lg:mt-0">
            <BlogCard 
              title="Django 5.0 Features"
              description="New ORM capabilities and async improvements in Django."
              fact={techFacts[1]}
              tag="Backend"
              accent="emerald"
            />
            
            <BlogCard 
              title="Modern Cloud Architecture"
              description="Serverless patterns and edge computing configurations."
              fact={techFacts[3]}
              tag="DevOps"
              accent="indigo"
            />
          </div>
        </div>
      </div>
      <div>

      </div>
   
    </section>
  
  );
}

const BlogCard = ({ title, description, fact, tag, accent }) => {
  const accentColors = {
    purple: { 
      border: 'border-l-purple-500',
      text: 'text-purple-400',
      bg: 'bg-purple-900/20',
      factBg: 'bg-purple-900/40'
    },
    blue: { 
      border: 'border-l-blue-500',
      text: 'text-blue-400',
      bg: 'bg-blue-900/20',
      factBg: 'bg-blue-900/40'
    },
    emerald: { 
      border: 'border-l-emerald-500',
      text: 'text-emerald-400',
      bg: 'bg-emerald-900/20',
      factBg: 'bg-emerald-900/40'
    },
    indigo: { 
      border: 'border-l-indigo-500',
      text: 'text-indigo-400',
      bg: 'bg-indigo-900/20',
      factBg: 'bg-indigo-900/40'
    }
  };

  return (
    <div className="group relative">
      {/* Main Card */}
      <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border-l-4 ${accentColors[accent].border} relative z-10 transition-all duration-300 hover:bg-gray-800/70 hover:-translate-y-1 shadow-lg shadow-black/20`}>
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 text-xs font-bold ${accentColors[accent].text} bg-gray-900/80 rounded-full`}>
            {tag}
          </span>
          <span className="text-sm text-gray-400">5 min read</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        
        <button className={`flex items-center font-medium ${accentColors[accent].text} group-hover:underline`}>
          Read more
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      
      {/* Context Fact - appears on hover */}
      <div className={`absolute -bottom-5 right-5 px-4 py-2 rounded-lg ${accentColors[accent].factBg} backdrop-blur-sm shadow-md z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        <p className="text-sm text-gray-200 italic">"Did you know? {fact}"</p>
      </div>
    </div>
  

  );
};