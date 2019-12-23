import types from './Types';
import { cloneRealmObj } from '../../Model';
import _ from 'lodash';
import { Toast } from 'native-base';
import { createUUID } from '../../Utils/CreateUUID';
import { User, ContactGroups } from '../../Model';
import { linkMessagesToContactThread } from '../../Ducks/ContactThreads/Utils';
export const messagesWriter = async (realm, action) => {
  switch (action.type) {
    case types.ADD_CHAT_MESSAGE: {
      const { message } = action.payload;
      let contactThread, contactGroup;
      const newMsg = realm.create('ChatMessages', message, true);
      if (!message.isTeam) {
        contactThread = realm.objectForPrimaryKey(
          'ContactThreads',
          message.channelID
        );
        contactThread.chatMessages.push(newMsg);
      } else {
        contactGroup = realm.objectForPrimaryKey(
          'ContactGroups',
          message.channelID
        );
        contactGroup.chatMessages.push(newMsg);
      }

      break;
    }

    case types.UPDATE_MESSAGE: {
      if (realm.objectForPrimaryKey('ChatMessages', action.payload._id)) {
        realm.create('ChatMessages', action.payload, true);
      }

      break;
    }

    case types.RESET_MESSAGE_COUNT: {
      const { deal, contactThread, channel } = action.payload;
      if (deal) {
        try {
          realm.create('DealAlerts', deal, true);
        } catch (error) {
          console.log('Error writing dealAlert', error);
        }
      }

      if (contactThread) {
        try {
          console.log('');
          realm.create('ContactThreads', contactThread, true);
        } catch (error) {
          console.log('Error writing contact threads', error);
        }
      }
      if (channel) {
        try {
          realm.create('Channels', channel, true);
        } catch (error) {
          console.log('Error writing channels', error);
        }
      }

      break;
    }

    default:
      break;
  }
};
