'use client';
import React from 'react';
import InputFileUpload from './Fileupload';
import StudyPlanSelect from './List';
import PDFViewer from './PDFview';

export default function UploadPage() {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(null);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [selectedPlans, setSelectedPlans] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleFileSelect = (files) => {
    setSelectedFiles(files);
  };

  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadError('Please select at least one file');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      if (selectedPlans && selectedPlans.length > 0) {
        selectedPlans.forEach(plan => {
          formData.append('studyplanid', plan.id);  
          console.log('Selected Study Plan ID:', plan.id);
        });
      }

      formData.append('uploaded_at', new Date().toISOString());

      const response = await fetch('http://localhost:8000/Fileupload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      setUploadSuccess(true);
      setSelectedFiles([]); 
      
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePlanSelection = (plans) => {
    setSelectedPlans(plans);
  };

  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-300 mb-2">Upload Files</h1>
        <p className="text-gray-200">Select study plans and upload your files</p>
      </div>
      
      <div className="w-full max-w-md space-y-6 rounded-lg">
        <div className='py-4'>
          <StudyPlanSelect onSelectionChange={handlePlanSelection} />
        </div>
        <InputFileUpload 
          selectedPlans={selectedPlans} 
          onFileSelect={handleFileSelect}
        />
      </div>
      <button 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        onClick={handleFileUpload}
        disabled={isUploading || selectedFiles.length === 0}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      { uploadSuccess&& (
        <div className="mt-4 text-green-500">
          {uploadSuccess ? 'Files uploaded successfully!' : uploadError}
        </div>
      )}
      <PDFViewer/>

    </div>
  );
}