import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Centered container */}
      <div className="relative mx-auto max-w-4xl">
        <div className="flex items-center justify-between h-16 px-6rounded-b-xl ">
      

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="#blog">Blog</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          {/* Sign Up Button - Right side */}
          <button className="hidden md:block px-4 py-1.5 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-purple-500/30 hover:shadow-lg transition-all">
            Sign up
          </button>

          {/* Mobile menu button */}
          <button className="md:hidden p-1 text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

const NavLink = ({ href, children }) => (
  <Link href={href} className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors relative">
    {children}
    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-4/5 transition-all duration-300"></span>
  </Link>
);