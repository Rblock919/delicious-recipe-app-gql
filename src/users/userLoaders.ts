import DataLoader from 'dataloader';
import * as _ from 'lodash';
import { User } from './models/user.model';

export const createUserLoader = () => {
  return new DataLoader(userIds => {
    return User.find({ _id: { $in: userIds } })
      .exec()
      .then(users => {
        console.log('users loader batch: ', userIds.length);
        const usersById = _.keyBy(users, '_id');
        return userIds.map(userId => usersById[userId]);
      });
  });
};
