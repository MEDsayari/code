const express = require('express');
const router = express.Router();
const Form = require('../models/formmodel');

// POST request to create a new form
router.post('/', async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    console.log(req.body);
    res.status(200).json({ message: 'Le formulaire a été créé avec succès.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la création du formulaire." });
  }
});

// GET request to retrieve all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find(); // retrieve all forms from the database
    res.status(200).json({ forms }); // send the forms data in the response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des formulaires." });
  }
});

// GET request to retrieve a single form by ID
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id); // retrieve the form with the specified ID
    if (!form) {
      return res.status(404).json({ message: 'Le formulaire demandé est introuvable.' });
    }
    res.status(200).json({ form }); // send the form data in the response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération du formulaire." });
  }
});

module.exports = router;
