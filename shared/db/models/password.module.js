import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const passwordResetTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  passwordRecoveryCode: String,
  expiryDate: {type: Date, expires: '2h'}
});

export const PasswordResetToken = mongoose.model('PasswordResetToken', passwordResetTokenSchema);
