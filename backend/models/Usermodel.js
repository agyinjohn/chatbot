const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trrim: true,
    unique: true,
    text: true,
  },
  password: {
    type: String,
    min: 6,
    require: [true, "Password is required"],
    trim: true,
  },
});

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
