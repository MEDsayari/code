const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  titreForm: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true 
  }
});

module.exports = mongoose.model('Form', formSchema);
