import { useNavigate } from "react-router-dom"
import ContainedButton from "../components/ContainedButton";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
            <ContainedButton text="Login" onClick={() => navigate('/login')} />
            <ContainedButton text="Register" onClick={() => navigate('/register')} />
        </div>
    );
}

export default Landing;