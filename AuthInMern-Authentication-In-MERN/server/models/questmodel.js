const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'form',
    required: true,
  },
});

module.exports = mongoose.model('Question', questionSchema);