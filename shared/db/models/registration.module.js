import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const emailVerificationTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  verificationToken: String,
  expiryDate: { type: Date, expires: '2h' }
});

export const EmailVerificationToken = mongoose.model('EmailVerificationToken', emailVerificationTokenSchema);
