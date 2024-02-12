import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.validatePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model("User", userSchema);
