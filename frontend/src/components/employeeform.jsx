import { useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEmployee = {
            firstName,
            lastName,
            email,
            department,
            salary
        };

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/employees', newEmployee, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFirstName('');
            setLastName('');
            setEmail('');
            setDepartment('');
            setSalary('');

        } catch (err) {
            console.error(err);
            setError('Failed to add employee');
        }
    };

    return (
        <div>
            <h2>Add Employee</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Tech">Tech</option>
                        <option value="Operations">Operations</option>
                    </select>
                </div>
                <div>
                    <label>Salary:</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
