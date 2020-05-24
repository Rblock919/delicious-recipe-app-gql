import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Validation at database level
    // match: /[a-zA-Z]*/, //some reg ex
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});

// eslint-disable-next-line func-names
userSchema.pre('save', async function(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = Number.parseInt(process.env.SALT_ROUNDS, 10);
    user.password = await bcrypt.hash(user.password, saltRounds);
    return next();
  } catch (err) {
    console.log(`err ${err}`);
    return next(err);
  }
});

// eslint-disable-next-line func-names
userSchema.methods.passwordIsValid = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.error(`err: ${err}`);
    return false;
  }
};

export const User = mongoose.model('user', userSchema);
