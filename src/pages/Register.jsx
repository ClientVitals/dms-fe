import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { register } from "../utils/auth";
import ContainedButton from "../components/ContainedButton";
import TextInput from "../components/TextInput";
import { Stack } from "@mui/material";

const Register = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("");

    const handleChange = (event) => setRole(event.target.value);

    const navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault()
        try {
            console.log({
                email, password, role
            })

            await register(email, password, role);

            navigate('/login');
        } catch (error) {
            setError('Failed To Register')
        }
    }

    return (
        <div style={{ width: '600px', margin: '0 auto'}}>
            <h4>
                Register
            </h4>
            {
                error && <p>{error}</p>
            }
            <Stack spacing={3}>
                <TextInput name={'email'} onChange={(event) => setEmail(event?.target?.value)} />
                <TextInput name={'password'} onChange={(event) => setPassword(event?.target?.value)} password />

                <Dropdown selectedOption={role} handleChange={handleChange} />

                <ContainedButton text="Submit" onClick={submit} />
            </Stack> 
        </div>
    )
}

export default Register;