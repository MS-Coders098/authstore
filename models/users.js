const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String},
  fullname: { type: String},
  email: { type: String},
  password: { type: String },
  books: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }
  ]
});

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);


