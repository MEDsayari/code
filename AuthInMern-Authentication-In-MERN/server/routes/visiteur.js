const express = require('express');
const router = express.Router();
const Visiteur = require('../models/visiteurmodel');

// POST request to create a new visitor
router.post('/', async (req, res) => {
  try {
    const { formId, numeroTelephone } = req.body;

    // Check if visitor with phone number already exists
    const existingVisitor = await Visiteur.findOne({ numeroTelephone });
    if (existingVisitor) {
      return res.status(400).json({ message: 'Un visiteur avec ce numéro de téléphone existe déjà.' });
    }

    // Create new visitor and save to database
    const newVisitor = new Visiteur({ formId, numeroTelephone });
    await newVisitor.save();
    
    res.status(200).json({ message: 'Le visiteur a été créé avec succès.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la création du visiteur." });
  }
});

module.exports = router;
