const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  username: {
  type: String,
  required: true,
  unique: true,
  trim: true,
  minlength: 3,
  maxlength: 20,
},

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    default: "default-avatar",
  },

  wins: {
    type: Number,
    default: 0,
  },

  losses: {
    type: Number,
    default: 0,
  },

  gamesPlayed: {
    type: Number,
    default: 0,
  },

  rank: {
    type: String,
    default: "Bronze",
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);