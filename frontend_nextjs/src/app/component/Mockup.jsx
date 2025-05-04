'use client'
import React from 'react'
import CMD from './cmd'

export default function MockUpFE() {
  return (
    <section className='my-24 relative overflow-hidden bg-gray-800 w-max rounded-lg border-2 border-white shadow-[0_0_15px_white]'>

      <div className='p-6'>
        <CMD
          commands={[
            { command: "git clone https://github.com/iMuneera/MochAi.git" },
            { command: "cd MochAi" },
            { command: "cd frontend_nextjs" },
            { command: "npm install" },
            { command: "npm run dev" }
          ]}
          title="Frontend Next.js"
          prompt=">"
        />
      </div>
    </section>
  );
}

export function MockUpBE() {
  return (
    <section className='my-24 relative overflow-hidden bg-gray-800 w-max rounded-lg border-2 border-white shadow-[0_0_15px_white]'>
      <div className='p-6'>
        <CMD
          commands={[
            { command: "git clone https://github.com/iMuneera/MochAi.git" },
            { command: "cd MochAi" },
            { command: "cd Backend_django" },
            { command: "python manage.py runserver" }
          ]}
          title="Backend Django"
          prompt=">"
        />
      </div>
    </section>
  );
}

export function MockUpLastLine() {
  return (
    <section className='relative overflow-hidden bg-gray-800 w-max rounded-lg border-2 border-white shadow-[0_0_15px_white]'>
      <div className='p-6'>
        <CMD
          commands={[
            { command: "   - Local:        http://localhost:3000  " },
            { command: "  - Network:      http://192.168.100.114:3000  " },
            { command: "  ✓ Starting..."},
            { command: " ✓ Ready in 1116ms"}  
          ]}
          prompt=">"
       
        />
      </div>
    </section>
  );
}
