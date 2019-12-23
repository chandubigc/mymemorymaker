import Realm from 'realm';
import { ChatMessages } from './ChatMessages';
import Contacts from './Contacts';
import ContactGroups from './ContactGroups';
import User from './User';
import ContactThreads from './ContactThreads';


const realm = new Realm({
  schema: [
    ChatMessages,
    Contacts,
    ContactGroups,
    User,
    ContactThreads,

  ],
  path: 'mymm.realm',
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true,
  // migration: (oldRealm, newRealm) => {

  // },
});

export default realm;
