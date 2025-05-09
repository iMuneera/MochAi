import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between h-20">
          <nav className="hidden md:flex items-center space-x-10">
            <Link 
              href="/" 
              className="text-lg text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white
              transition-all duration-300 ease-out
              hover:scale-105 hover:underline hover:underline-offset-4"
            >
              Home
            </Link>
            <Link 
              href="/#blog" 
              className="text-lg text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white
              transition-all duration-300 ease-out
              hover:scale-105 hover:underline hover:underline-offset-4"
            >
              Blog
            </Link>
            <div className="relative group">
              <button className="text-lg text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white
              transition-all duration-300 ease-out
              hover:scale-105 hover:underline hover:underline-offset-4 flex items-center">
                Hobbies
                <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
              transition-all duration-300 origin-top z-50 space-y-1">
                <Link 
                  href="/library" 
                  className="block text-base text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white
                  transition-all duration-300
                  hover:scale-[1.02] hover:underline hover:underline-offset-4"
                >
                  Books
                </Link>
                <Link 
                  href="/Movies" 
                  className="block text-base text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white
                  transition-all duration-300
                  hover:scale-[1.02] hover:underline hover:underline-offset-4"
                >
                  Shows
                </Link>
              </div>
            </div>
          </nav>

          <button className="md:hidden p-2 text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white
          transition-all duration-300 hover:scale-110">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}