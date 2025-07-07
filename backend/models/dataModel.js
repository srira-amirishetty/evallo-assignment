const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: { type: String },
  gender: { type: String },
  age: { type: Number },
  language:{type: String},
  region:{type:String}
});

module.exports = mongoose.model('data', dataSchema);