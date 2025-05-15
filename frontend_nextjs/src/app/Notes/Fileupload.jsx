
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const handleFileUpload = async (files) => {
  if (!files || files.length === 0) return;

  try {
    const formData = new FormData();

    // Add file(s)
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    // Add other required fields
    formData.append('title', 'Default Title'); 
    formData.append('content', 'Default Content'); 

    const response = await fetch('http://localhost:8000/Fileupload/', {
      method: 'POST',
      body: formData,

    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const result = await response.json();
    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Error uploading files:', error);
  }
};


export default function InputFileUpload() {

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => handleFileUpload(event.target.files)}
        multiple
      />
    </Button>
  );
}
