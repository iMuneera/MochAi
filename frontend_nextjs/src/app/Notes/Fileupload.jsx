import React from 'react';

export default function InputFileUpload({ selectedPlans, onFileSelect }) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(null);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const fileInputRef = React.useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    if (onFileSelect) {
      onFileSelect(files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    if (onFileSelect) {
      onFileSelect(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md">
      <div 
        className="flex flex-col items-center w-full p-8 text-gray-800 rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all duration-200 cursor-pointer"
        onClick={triggerFileInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="p-4 mb-3 bg-blue-50 rounded-full">
          <svg className="w-6 h-6 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
        </div>
        <span className="text-lg font-medium mb-1 text-gray-200">
          {isUploading ? 'Uploading...' : 'Drag & drop files or click to browse'}
        </span>
        
        {selectedFiles.length > 0 && (
          <div className="mt-2 text-sm text-gray-300 text-center">
            {selectedFiles.map((file, index) => (
              <div key={index}>{file.name}</div>
            ))}
          </div>
        )}

        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
      {isUploading && (
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{width: '70%'}}></div>
        </div>
      )}
      
      {uploadError && (
        <div className="w-full p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start" role="alert">
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium">Upload failed</p>
            <p className="text-sm">{uploadError}</p>
          </div>
        </div>
      )}
      {uploadSuccess && (
        <div className="w-full p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-start" role="alert">
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium">Upload successful!</p>
            <p className="text-md">Your files have been uploaded successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}