import Model from './Model.js';
import { double0, boolF } from './Constants';

export default class Contacts extends Model {
  static schema = {
    name: 'Contacts',
    primaryKey: 'mobile',
    properties: {
      mobile: 'string',
      firstName: { type: 'string', default: '' },
      lastName: { type: 'string', default: '' },
      email: 'string?',
      _id: { type: 'string', indexed: true },
      avatar: 'string?',
      name: 'string',
      updatedAt: double0,
      registeredOn: double0,
    },
  };
}
