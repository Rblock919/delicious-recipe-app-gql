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
        console.log(chalk.inverse('connected to db in server.js'));
      } else {
        console.log(
          chalk.red(`Error connecting to database in server.js... ${err}`)
        );
      }
    }
  );
};

export const models = { ...recipeModels, userModel, loginModel };
