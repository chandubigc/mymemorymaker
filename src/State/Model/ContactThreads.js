import Model from './Model';
import { boolF, boolT, int0, double0 } from './Constants';

export default class ContactThreads extends Model {
  static schema = {
    name: 'ContactThreads',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      contact: 'Contacts',
      chatMessages: 'ChatMessages[]',
      latestMessage: 'ChatMessages?',
    },
  };
}
