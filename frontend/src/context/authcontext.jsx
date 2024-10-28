import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post('https://eval2.onrender.com/login', { email, password });
            const loggedInUser = { email: res.data.payload.user.email };
            setUser(loggedInUser);
            setToken(res.data.token);
            return loggedInUser;
        } catch (error) {
            throw new Error(error.response?.data?.msg || 'Login failed');
        }
    };

    const register = async (email, password) => {
        const response = await fetch('https://eval2.onrender.com/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Registration failed'); 
        }

        return response.json();
    };


    return (
        <AuthContext.Provider value={{ user, token, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
