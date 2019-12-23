import Model from './Model.js';
import { double0, int0 } from './Constants';

export default class ContactGroups extends Model {
  static schema = {
    name: 'ContactGroups',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      name: 'string',
      contacts: 'Contacts[]',
      avatar: 'string?',
      storageStatus: { type: 'string', default: 'P' },
      createdAt: double0,
      updatedAt: double0,
      unreadMessageCount: int0,
      latestMessage: 'ChatMessages?',
      chatMessages: 'ChatMessages[]',
    },
  };
}
