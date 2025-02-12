import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Dropdown = ({ selectedOption, handleChange }) => {
  return (
    <div>
      <InputLabel id="role-dropdown-label">Role:</InputLabel>
      <Select fullWidth id="role-dropdown" labelId="role-dropdown-label" label="Role" onChange={handleChange}>
          <MenuItem value={"corporate"}>Corporate</MenuItem>
          <MenuItem value={"board"}>Board</MenuItem>
          <MenuItem value={"hr"}>HR</MenuItem>
          <MenuItem value={"finance"}>Finance</MenuItem>
          <MenuItem value={"legal"}>Legal</MenuItem>
          <MenuItem value={"sales"}>Sales</MenuItem>
          <MenuItem value={"neatt"}>NEATT</MenuItem>
          <MenuItem value={"tech"}>Technology</MenuItem>
      </Select>
    </div>
  );
}

export default Dropdown;
