import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            navigate("/Login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                <h2>Signup</h2>
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
                        Signup
                    </button>
                </form>
                <p onClick={() => navigate('/Login')}>Already have an account?</p>
            </div>
        </div>
    );
};

