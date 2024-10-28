const express = require('express');
const { addEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeecontoller');
const authMiddleware = require('../middlewares/authmiddleware'); 

const router = express.Router();


router.post('/employees', authMiddleware, addEmployee);
router.get('/employees', authMiddleware, getEmployees);
router.put('/employees/:id', authMiddleware, updateEmployee);
router.delete('/employees/:id', authMiddleware, deleteEmployee);

module.exports = router;
