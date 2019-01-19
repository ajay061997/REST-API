const express = require('express');

const { body } = require('express-validator/check');

const employeeController = require('../controllers/employee');

const router = express.Router();

//GET
router.get('/employee', employeeController.getEmployees);

//POST
router.post('/employee',
 [
    body('email', 'Please enter a valid Email')
        .isEmail()
        .normalizeEmail()
 ], employeeController.postEmployee);

module.exports = router;