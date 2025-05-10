import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }} className="text-white">
      <FormControl fullWidth>
   
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Proficiency level"
          onChange={handleChange}
          className="text-white bg-gray-800 "
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(75, 85, 99)',
              fontColor: 'white',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(59, 130, 246)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(59, 130, 246)',
              borderWidth: 2,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: 'rgb(31, 41, 55)',
                color: 'white',
                '& .MuiMenuItem-root': {
                  '&:hover': {
                    bgcolor: 'rgb(55, 65, 81)',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'rgb(59, 130, 246)',
                    '&:hover': {
                      bgcolor: 'rgb(37, 99, 235)',
                    },
                  },
                },
              },
            },
          }}
        >
          <MenuItem value={"Beginner"} className="text-white hover:bg-gray-700">
            Beginner
          </MenuItem>
          <MenuItem value={"Intermediate"} className="text-white hover:bg-gray-700">
            Intermediate
          </MenuItem>
          <MenuItem value={"Advanced"} className="text-white hover:bg-gray-700">
            Advanced
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}