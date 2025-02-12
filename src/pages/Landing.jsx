import { useNavigate } from "react-router-dom"
import ContainedButton from "../components/ContainedButton";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{padding: '50px 120px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '50%', margin: '0 auto'}}>
            <ContainedButton text="Login" onClick={() => navigate('/login')} />
            <ContainedButton text="Register" onClick={() => navigate('/register')} />
        </div>
    );
}

export default Landing;