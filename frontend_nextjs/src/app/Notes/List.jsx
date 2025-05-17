
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,

} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';



export default function StudyPlanSelect({ onSelectionChange }) {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [studyPlans, setStudyPlans] =useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState(null);

  const fetchStudyPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/get_studyPlan/');
      const data = await response.json();
      const activePlans = data.studyPlan.filter(plan => !plan.completed);
      setStudyPlans(activePlans); } 

    catch (error) {
      setError(error.message);
      console.error('Error fetching study plans:', error);
    } 
  };

  useEffect(() => {
    fetchStudyPlans();
  }, []);

const handleChange = (event) => {
    const { value } = event.target;
    const newSelection = typeof value === 'string' ? value.split(',') : value;
    setSelectedPlans(newSelection);

    if (onSelectionChange) {
        const selectedPlanObjects = studyPlans.filter(plan => 
            newSelection.includes(plan.subject)
        );
        onSelectionChange(selectedPlanObjects);
    }
};



  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="study-plan-select-label">Study plan</InputLabel>
      <Select
        labelId="study-plan-select-label"
        id="study-plan-select"
        value={selectedPlans}
        onChange={handleChange}
        input={<OutlinedInput label="Study plan" />}
        renderValue={(selected) => selected.join('')}
 
      >
        {studyPlans.map((plan) => (
          <MenuItem key={plan.id} value={plan.subject}>
            <Checkbox checked={selectedPlans.includes(plan.subject)} />
            <ListItemText primary={plan.subject} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}