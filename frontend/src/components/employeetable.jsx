import { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://eval2.onrender.com/employees', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEmployees(response.data);
                console.log('Employees:', response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch employees');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        console.log('Delete called for ID:', id);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://eval2.onrender.com/employees/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEmployees(employees.filter(employee => employee._id !== id));
        } catch (error) {
            console.error("Failed to delete employee", error);
            setError("Failed to delete employee");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Employee List</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <button >Edit</button>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
