const Employee = require('../models/employee');

const { validationResult } = require('express-validator/check');

exports.getEmployees = (req, res, next) => {
    res.status(200).json({
        message: 'Testing Data',
        employee: [{
            name: 'test',
            email: 'test@test.com',
            location: 'test',
            phone: '123'
        }]
    })
};

// exports.getEmployees = (req, res, next) => {
//     Employee.find()
//         .then((employee) => {
//             res.status(200).json({
//                 employeeDetails: employee
//             })
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// };

exports.postEmployee = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const name = req.body.name;
    const email = req.body.email;
    const location = req.body.location;
    const phone = req.body.phone;

    Employee.findOne({ email: email })
        .then((user) => {
            if(user) {
                return res.status(409).json({
                    message: "User Email Id already used"
                })
            }
            const employee = new Employee({
                name: name,
                email: email,
                location: location,
                phone: phone
            });
            return employee.save()
            .then((result) => {
                console.log(result);
                res.status(201).json({
                    message: 'Employee Created Successfully!',
                    details: result
                })
            })

        })

        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};