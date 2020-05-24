import mongoose from 'mongoose';
import chalk from 'chalk';
import { recipeModels } from './recipes';
import { userModel } from './users';
import { loginModel } from './auth';

export const connectMongo = () => {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (!err) {
        console.log(chalk.inverse('Successfully Connected to DB'));
      } else {
        console.log(chalk.red(`Error Connecting to Database... ${err}`));
      }
    }
  );
};

export const models = { ...recipeModels, userModel, loginModel };
