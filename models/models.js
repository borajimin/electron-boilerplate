var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGODB_URI);

var userSchema = new Schema({
  username: {
    type:String,
    required: true,
    unique: true
  },
  password: {
    type:String,
    required: true
  },
  firstName: String
});

var User = mongoose.model('User', userSchema);

module.exports = { User };
