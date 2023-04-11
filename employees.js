const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");
const Image = require('../Image') 
const Joi = require('joi');
// Define your routes here




// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// Get a single employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// Create a new employee
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, department } = req.body;
    const employee = new Employee({ name, email, phone, department });
    await employee.save();
    res.send("Employee added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// Update an employee
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone, department } = req.body;
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.phone = phone || employee.phone;
    employee.department = department || employee.department;

    await employee.save();

    res.send("Employee updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    await employee.remove();

    res.send("Employee deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});


router.post('/', async (req, res) => {
    try {
      const { error } = employeeSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        department: req.body.department,
        joiningDate: req.body.joiningDate,
        avatar: req.body.avatar,
      });
  
      const savedEmployee = await employee.save();
      res.json(savedEmployee);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;
