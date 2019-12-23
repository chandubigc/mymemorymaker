import Model from './Model';
import { boolF, double0, boolT } from './Constants';

export class ChatMessages extends Model {
  static schema = {
    name: 'ChatMessages',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      createdAt: 'double',
      sent: 'bool?',
      received: 'bool?',
      senderID: 'string',
      messageType: 'string?',
      text: { type: 'string', default: '' },
      system: 'bool?',
      user: 'Contacts',
      storageStatus: { type: 'string', default: 'P' },
      status: { type: 'string', indexed: true },
      channelID: 'string',
      isTeam: boolF,
    },
  };
}
