const Employees = require('../models/employee.model')

// Opération de création d'un nouvel employé
const createEmployee = async (req, res) => {
  try {
    const { employee_id, first_name, last_name, address, department } = req.body;
    
    const newEmployee = new Employees({
      employee_id,
      first_name,
      last_name,
      address,
      department,
    });

    await newEmployee.save();

    res.status(201).json({ success: true, data: newEmployee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la création de l\'employé.', error: error.message });
  }
};

// Opération de lecture de tous les employés
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();

    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des employés.', error: error.message });
  }
};

// Opération de lecture d'un employé par son ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employees.findById(id);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employé non trouvé.' });
    }

    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération de l\'employé.', error: error.message });
  }
};

// Opération de mise à jour d'un employé par son ID
const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_id, first_name, last_name, address, department } = req.body;

    const updatedEmployee = await Employees.findByIdAndUpdate(
      id,
      { employee_id, first_name, last_name, address, department, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: 'Employé non trouvé.' });
    }

    res.status(200).json({ success: true, data: updatedEmployee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de l\'employé.', error: error.message });
  }
};

// Opération de suppression d'un employé par son ID
const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employees.findByIdAndRemove(id);

    if (!deletedEmployee) {
      return res.status(404).json({ success: false, message: 'Employé non trouvé.' });
    }

    res.status(200).json({ success: true, data: deletedEmployee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression de l\'employé.', error: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};