import mongoose from 'mongoose';

const LoginsSchema = new mongoose.Schema({
  identityKey: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  failedAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  timeOut: {
    type: Date,
    required: true,
    default: new Date(),
  },
  inProgress: {
    type: Boolean,
  },
});

// eslint-disable-next-line func-names
LoginsSchema.static('canAuthenticate', async function(key: string) {
  const login = await this.findOne({ identityKey: key });

  if (!login || login.failedAttempts < 4) {
    return true;
  }

  const timeOutTimer = new Date(login.timeOut);
  timeOutTimer.setMinutes(login.timeOut.getMinutes() + 2); // make sure its been 2 minutes since the last allowed attempted login

  /*
    let tempVar = new Date(2019, 11, 30, 23, 58); //timeout set in table
    let tempVar2 = new Date(2020, 0, 1, 0, 20); //time of newly attempted login

    let testingVar1 = tempVar2.getMinutes() - (tempVar.getMinutes() + 1);
    console.log('testingVar1: ' + testingVar1);

    let testingVar2 = tempVar2.getHours() - tempVar.getHours();
    console.log(`testingVar2: ${testingVar2}`);

    let testingVar3 = tempVar2.getDate() - tempVar.getDate();
    console.log(`testingVar3: ${testingVar3}`);

    let testingVar4 = tempVar2.getMonth() - tempVar.getMonth();
    console.log(`testingVar4: ${testingVar4}`);

    let testingVar5 = tempVar2.getFullYear() - tempVar.getFullYear();
    console.log(`testingVar5: ${testingVar5}`);
     */

  const timeoutMinutes = new Date().getMinutes() - timeOutTimer.getMinutes();
  const timeoutHours = new Date().getHours() - login.timeOut.getHours();
  const timeoutDay = new Date().getDate() - login.timeOut.getDate();
  const timeoutMonth = new Date().getMonth() - login.timeOut.getMonth();
  const timeoutYear = new Date().getFullYear() - login.timeOut.getFullYear();

  if (
    timeoutMinutes >= 0 ||
    timeoutHours > 0 ||
    timeoutDay > 0 ||
    timeoutMonth > 0 ||
    timeoutYear > 0
  ) {
    await login.remove();
    return true;
  }
  return false;
});

LoginsSchema.static('failedLoginAttempt', async function(key: string) {
  const query = { identityKey: key };
  const now = new Date();
  const update = {
    $inc: { failedAttempts: 1 },
    timeOut: now,
    inProgress: false,
  };
  const options = { setDefaultsOnInsert: true, upsert: true };
  return this.findOneAndUpdate(query, update, options).exec();
});

LoginsSchema.static('successfulLoginAttempt', async function(key: string) {
  const login = await this.findOne({ identityKey: key });
  if (login) {
    return login.remove();
  }
  return null;
});

LoginsSchema.static('inProgress', async function(key: string) {
  const login = await this.findOne({ identityKey: key });
  const query = { identityKey: key };
  const update = { inProgress: true };
  const options = { setDefaultsOnInsert: true, upsert: true };
  await this.findOneAndUpdate(query, update, options).exec();
  return login && login.inProgress;
});

LoginsSchema.static('endProgress', async function(key: string) {
  const query = { identityKey: key };
  const update = { inProgress: false };
  const updatedLogin = await this.findOneAndUpdate(query, update).exec();
  return updatedLogin.inProgress;
});

export const loginModel = mongoose.model('logins', LoginsSchema);
