import Link from 'next/link';
import React from 'react';

export default function Header() {
    return (
        <header className="p-4 sticky top-0 z-50">
            <div className="container flex justify-between h-16 mx-auto">
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <a
                            rel="noopener noreferrer"
                            href="#home"
                            className="flex items-center px-4 -mb-1 border-b-2 dark:border-"
                        >
                           Home
                        </a>
                    </li>
                    <li className="flex">
                        <a
                            rel="noopener noreferrer"
                            href="#blog"
                            className="flex items-center px-4 -mb-1 border-b-2 dark:border-"
                        >
                            Blog
                        </a>
                    </li>
                 
                </ul>
                <Link
                  
                    href="/Lover"
                    aria-label="Back to homepage"
                    className="flex items-center p-2"
                >

                 <img src={"/sleepy.png"} alt="Logo" className="w-25 h-25" />

                </Link>
                <div className="flex items-center md:space-x-4">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button
                                type="submit"
                                title="Search"
                                className="p-1 focus:outline-none focus:ring"
                            >
                             
                            </button>
                        </span>
                   
                    </div>
                    <button
                        type="button"
                        className="hidden px-6 py-2 font-semibold rounded lg:block dark:bg-violet-600 dark:text-gray-50"
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        className="hidden px-6 py-2 font-semibold rounded lg:block dark:bg-violet-600 dark:text-gray-50"
                    >
                       sign up
                    </button>
                </div>
                <button title="Open menu" type="button" className="p-4 lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 dark:text-gray-800"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>
        </header>
    );
};
