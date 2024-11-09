import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  followers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
  ],
  following: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
  ],
  profileImg:{
    type: String,
    default: ""  // Default profile image URL
  },
  bio:{
    type: String,
    default: ""  // Default biography content
  },
  link:{
    type: String,
    default: ""  // Default link to website or social media profile
  }

},{
    timeStamps:true
});

const User = mongoose.model("User", UserSchema);
export default User