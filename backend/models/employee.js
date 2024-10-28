// models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, enum: ['Tech', 'Marketing', 'Operations'], required: true },
    salary: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
