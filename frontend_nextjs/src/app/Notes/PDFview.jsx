import { useState } from 'react';
import { EmbedPDF } from '@simplepdf/react-embed-pdf';
import { useEffect } from 'react';

export default function PDFViewer() {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPdfs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/getpdf/');
      const data = await response.json();

      

      // Process all PDFs in the response
      const processedPdfs = await Promise.all(
        data.notes.map(async (note) => {
          let pdfUrl = note.fileupload;
          if (pdfUrl.startsWith('/')) {
            pdfUrl = `http://localhost:8000${pdfUrl}`;
            console.log(`Converted relative URL to absolute: ${pdfUrl}`);
          }

          // Verify the URL returns a PDF
          const testResponse = await fetch(pdfUrl);
          return {
            url: pdfUrl,
            id: note.id ,
            name: note.title 
          };
        })
      );

      // Filter out any null entries (invalid PDFs)
      const validPdfs = processedPdfs.filter(pdf => pdf !== null);

      if (validPdfs.length === 0) {
        throw new Error('No valid PDF files found');
      }

      setPdfs(validPdfs);
      setSelectedPdf(validPdfs[0]); // Select first PDF by default
    } catch (error) {
      setError(`Failed to load PDFs: ${error.message}`);
      console.error('Error details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const handlePdfChange = (event) => {
    const selectedId = event.target.value;
    const pdf = pdfs.find(p => p.id === selectedId);
    setSelectedPdf(pdf);
  };

  const handleNextPdf = () => {
    const currentIndex = pdfs.findIndex(p => p.id === selectedPdf.id);
    const nextIndex = (currentIndex + 1) % pdfs.length;
    setSelectedPdf(pdfs[nextIndex]);
  };

  const handlePrevPdf = () => {
    const currentIndex = pdfs.findIndex(p => p.id === selectedPdf.id);
    const prevIndex = (currentIndex - 1 + pdfs.length) % pdfs.length;
    setSelectedPdf(pdfs[prevIndex]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-2 text-gray-700">Loading PDFs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchPdfs}
          className="ml-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!selectedPdf) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-700">No PDF available</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">PDF Viewer</h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <button 
              onClick={handlePrevPdf}
              disabled={pdfs.length <= 1}
              className={`px-3 py-1 rounded border ${pdfs.length <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'}`}
            >
              Previous
            </button>
            
            <select
              value={selectedPdf.id}
              onChange={handlePdfChange}
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
            >
              {pdfs.map((pdf) => (
                <option key={pdf.id} value={pdf.id}>
                  {pdf.name}
                </option>
              ))}
            </select>
            
            <button 
              onClick={handleNextPdf}
              disabled={pdfs.length <= 1}
              className={`px-3 py-1 rounded border ${pdfs.length <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'}`}
            >
              Next
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-3">
          Currently viewing: <span className="font-medium">{selectedPdf.name}</span>
        </p>
      </div>

      <div className="w-full h-[calc(100vh-180px)] border border-gray-200 rounded-lg overflow-hidden">
        <EmbedPDF
          companyIdentifier="react-viewer"
          mode="inline"
          style={{ 
            width: '100%',
            height: '100%',
            minHeight: '500px'
          }}
          documentURL={selectedPdf.url}
        />
      </div>
    </div>
  );
}