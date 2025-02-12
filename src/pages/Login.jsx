import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import { useUser } from "../hooks/useUser";
import ContainedButton from "../components/ContainedButton";
import TextInput from "../components/TextInput";
import { Stack } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { setUser } = useUser();

    const submit = async (event) => {
        event.preventDefault()
        try {
            const result = await login(email, password);

            setUser({
                name: result?.user?.username,
                role: result?.user?.role,
                token: result?.token
            });

            navigate('/content');
        } catch (error) {
            setError('Failed To Login')
        }
    }

    return (
        <div style={{ width: '600px', margin: '0 auto'}}>
            <h4>
                Enter Login
            </h4>
            {
                error && <p>{error}</p>
            }
            <Stack spacing={3}>
                <TextInput name={'email'} onChange={(event) => setEmail(event?.target?.value)} />
                <TextInput name={'password'} onChange={(event) => setPassword(event?.target?.value)} password />

                <ContainedButton text="Submit" onClick={submit} />
            </Stack>
        </div>
    )
}

export default Login;