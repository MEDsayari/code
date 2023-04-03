const mongoose = require('mongoose');

const schemaVisiteur = mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formulaire',
    required: true
  },
  numeroTelephone: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('Visiteur', schemaVisiteur);
