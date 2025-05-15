'use client';
import React from 'react';
import InputFileUpload from './Fileupload';

function Page() {
  return (
    <div className="flex flex-col items-center justify-center  py-24 ">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Upload Files</h1>
      </div>
      <div className="w-full max-w-md flex justify-center">
        <InputFileUpload />
      </div>
    </div>
  );
}

export default Page;