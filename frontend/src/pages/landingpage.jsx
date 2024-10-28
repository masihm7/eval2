import { useNavigate } from 'react-router-dom';

export const Landingpage = () => {
    
    const navigate = useNavigate();

    return (
        <div>
            <h1>Employee Management System</h1>
            <button onClick={() => navigate('Login')}>
                Login
            </button>
            <button onClick={() => navigate('Signup')}>
                Sign Up
            </button>
        </div>
    );
};