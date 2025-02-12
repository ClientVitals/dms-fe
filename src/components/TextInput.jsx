import TextField from '@mui/material/TextField'

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const TextInput = ({name, onChange, password}) => (
    <TextField 
        variant="outlined" 
        label={capitalize(name)} 
        placeholder={`Enter ${name.toLowerCase()}...`}
        id={name} 
        onChange={onChange} 
        type={password ? 'password' : 'text'}
    />
);

export default TextInput;