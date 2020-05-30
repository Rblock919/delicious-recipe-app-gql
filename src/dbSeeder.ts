import * as bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';

import { recipes } from './data/recipe.seed';
import { users } from './data/user.seed';

// TODO: implement seeding for db-users
MongoClient.connect(
  // 'mongodb://mongo:27017',
  // 'mongodb://appUser:recipe@localhost:27017/recipeApp?authSource=recipeApp',
  'mongodb://dev:dev@192.168.1.13:27017/recipeApp?authSource=admin',
  { useNewUrlParser: true, useUnifiedTopology: true },
  async (err, client) => {
    if (err) {
      console.log(`ERR CONNECTING TO DB: ${err}`);
    } else {
      try {
        const db = client.db('recipeApp');

        // seed recipes
        const recipeCollection = db.collection('recipes');
        await recipeCollection.insertMany(recipes);
        console.log('successfully seeded recipes!');

        // seed users
        users[0].password = await bcrypt.hash(users[0].password, 12);
        users[1].password = await bcrypt.hash(users[1].password, 12);
        const userCollection = db.collection('users');
        await userCollection.insertMany(users);
        console.log('successfully seeded users!');

        // close client
        await client.close(false);
      } catch (error) {
        console.log(`err seeding db: ${error}`);
      }
    }
  }
);
