import mongoose from 'mongoose';

const phoneAuthSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PhoneAuth = mongoose.model('PhoneAuth', phoneAuthSchema);

export default PhoneAuth;
