import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating'; 


export default function BasicRating({ value, onChange }) {
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}