const express = require('express');
const router = express.Router();
const Question = require('../models/questmodel');

// POST request to create a new question
router.post('/', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    console.log(req.body);
    res.status(200).json({ message: 'La question a été créée avec succès.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la création de la question." });
  }
});

// GET request to retrieve all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find(); // retrieve all questions from the database
    res.status(200).json({ questions }); // send the questions data in the response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des questions." });
  }
});

// GET request to retrieve all questions by formId
router.get('/:formId', async (req, res) => {
  try {
    const questions = await Question.find({ formId: req.params.formId }); // retrieve all questions with the specified formId
    res.status(200).json({ questions }); // send the questions data in the response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des questions." });
  }
});

module.exports = router;
