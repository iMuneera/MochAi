'use client'
import React from 'react'
import CMD from './cmd'

export default function MockUpFE() {
  return (
    <section className='my-24 relative overflow-hidden bg-gray-800 w-max'>
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
    <section className='my-24 relative overflow-hidden bg-gray-800 w-'>
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

