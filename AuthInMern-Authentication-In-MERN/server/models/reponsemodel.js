const mongoose = require('mongoose');

const reponseSchema = mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  reponse: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Reponse', reponseSchema);
