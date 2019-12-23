/* eslint-disable import/no-named-default */
import { messagesWriter } from './Messages';

import { contactsWriter } from './Contacts';
import { userWriter } from './User';
import { contactGroupWriter } from './ContactGroups';
import { default as pubnubConnection, pubnubWriter } from './PubNub';
import { contactThreadsWriter } from './ContactThreads';

export const reducers = {
  pubnubConnection,
};

export const writers = [
  messagesWriter,
  contactsWriter,
  contactGroupWriter,
  userWriter,
  pubnubWriter,
  contactThreadsWriter,

];