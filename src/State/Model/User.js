import Model from './Model.js';
import { double0, boolF, int0 } from './Constants';
import { string } from 'prop-types';
// mobile	first_name	last_name	company	email
export default class User extends Model {
  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'string', // changed from user_id
      isLoggedin: boolF,
      mobile: 'string',
    
      name: 'string', // new first_name + last_name
      
      email: 'string?',
      avatar: 'string',
     
      isVerified: boolF,
    },
  };
}
