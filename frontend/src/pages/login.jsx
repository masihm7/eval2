import { useState, useContext } from "react";
import AuthContext from "../context/authcontext";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/Dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">
                        Login
                    </button>
                </form>
                <p onClick={() => navigate('Signup')}>Dont have an account?</p>
            </div>
        </div>
    );
};

