const Employee = require('../models/employee');


exports.addEmployee = async (req, res) => {
    try {
        const { firstName, lastName, email, department, salary } = req.body;
        const employee = new Employee({ firstName, lastName, email, department, salary });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        console.error('Error adding:', error);
        res.status(500).json({ msg: 'internal Server error' });
    }
};






exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching:', error);
        res.status(500).json({ msg: 'internal Server error' });
    }
};




exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(id,updates);

        if (!updatedEmployee) return res.status(404).json({ msg: 'Employee not found' });

        res.json(updatedEmployee);
    } catch (error) {
        console.error('Error updating:', error);
        res.status(500).json({ msg: 'internal Server error' });
    }
};



exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        
        if (!deletedEmployee) return res.status(404).json({ msg: 'Employee not found' });
        res.json({ msg: 'Employee deleted' });
    } catch (error) {
        console.error('Error deleting:', error);
        res.status(500).json({ msg: 'internal Server error' });
    }
};
