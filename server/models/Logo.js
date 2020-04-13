var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: {type:String,trim: true, minlength: 0},
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  backgroundColor: String,
  borderColor: String,
  borderRadius: {type: Number, min: 0, max: 30},
  borderWidth: {type: Number, min: 0, max: 30},
  padding: {type: Number, min: 0, max: 30},
  margin: {type: Number, min: 0, max: 30},
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);