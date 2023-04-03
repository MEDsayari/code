const express = require('express');
const router = express.Router();
const Reponse = require('../models/reponsemodel');

// POST request to add a new response for a question
router.post('/', async (req, res) => {
  try {
    const newReponse = new Reponse({
      questionId: req.body.questionId,
      reponse: req.body.reponse
    });
    await newReponse.save();
    res.status(200).json({ message: 'La réponse a été ajoutée avec succès.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de l'ajout de la réponse." });
  }
});

module.exports = router;
