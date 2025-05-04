'use client'
import React from 'react'

export default function CMD({ 
  commands = [], 
  title = "terminal", 
  prompt = "$", 
  showCursor = true 
}) {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    // Optional: Add toast notification or visual feedback
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Title bar */}
      <div className="flex items-center bg-neutral text-neutral-content px-4 py-2 rounded-t-lg">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm font-mono">{title}</div>
      </div>
      
      {/* Terminal content */}
      <div className="mockup-code bg-primary text-primary-content rounded-t-none">
        {commands.map((cmd, i) => (
          <React.Fragment key={i}>
            <pre data-prefix={prompt} className="text-success relative group">
              <code className="flex items-center">
                <span className="mr-2">{cmd.command}</span>
                <button
                  onClick={() => handleCopy(cmd.command)}
                  className="opacity-100 transition-opacity duration-200
                    text-xs px-2 py-1 ml-2 bg-neutral text-neutral-content rounded
                    hover:bg-neutral-focus focus:outline-none"
                  aria-label="Copy command"
                >
                  Copy
                </button>
              </code>
            </pre>
            {cmd.output && (
              <pre className="pl-5 text-neutral-content">
                <code>{cmd.output}</code>
              </pre>
            )}
          </React.Fragment>
        ))}
        
        {/* Cursor */}
        {showCursor && (
          <pre data-prefix={prompt} className="text-success">
            <span className="inline-block w-2 h-5 bg-neutral-content animate-pulse"></span>
          </pre>
        )}
      </div>
    </div>
  )
}