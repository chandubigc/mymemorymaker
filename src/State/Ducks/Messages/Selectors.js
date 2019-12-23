import { createSelector } from 'reselect';
import { cloneRealmObj } from '../../Model';
import { createUUID } from '../../Utils/CreateUUID';
import _ from 'lodash';

const buildDummyMessage = (txt, user, dealID, channelID) => {
  const userData = user;
  const userToContactData = {
    mobile: userData.mobile,
    firstName: userData.firstName,
    lastName: userData.lastName,
    company: userData.company,
    email: userData.email,
    _id: userData._id,
    avatar: userData.avatar,
    name: userData.name,
    isTappitUser: true,
    inPhoneBook: false,
    systemFirstName: userData.firstName,
    systemLastName: '',
    lastAccessedTime: 0,
    city: userData.city,
    subtitle: userData.subtitle,
  };

  return {
    _id: createUUID(),
    text: txt,
    dealID,
    channelID,
    createdAt: Number(new Date().getTime()),
    status: 'sent',
    system: true,
    senderID: user._id,
    user: userToContactData,
  };
};

const realmMessages = (
  messages,
  user,
  msgsToRender,
  msgsToGetFromIndex = 0,
  contactThreadID = '',
) => {
  const systemMessages = ['EXPR', 'RJCT', 'RCRD'];
  return messages
    .slice(msgsToGetFromIndex, msgsToGetFromIndex + msgsToRender)
    .reduce((result, value) => {
      const tempValue = cloneRealmObj(value);

      // tempValue.system = systemMessages.includes(tempValue.messageType)
      //   ? true
      //   : tempValue.system
      //   ? tempValue.system
      //   : false;

      // if (tempValue.contentType === 'image') {
      //   if (tempValue.contentUrl) {
      //     tempValue.image = tempValue.contentUrl;
      //   } else {
      //     tempValue.image = tempValue.localPath;
      //   }
      // }

      // if (tempValue.recipients) {
      //   if (tempValue.isBroadcast && contactThreadID) {
      //     tempValue.recipients.forEach((t) => {
      //       if (t.status === 'D' && t.contact._id === contactThreadID) {
      //         tempValue.status = 'delivered';
      //       }
      //     });
      //   } else {
      //     let delivered = true;
      //     tempValue.recipients.forEach((t) => {
      //       if (t.status !== 'D' && t.contact._id !== user._id) {
      //         delivered = false;
      //       }
      //     });
      //     if (delivered) {
      //       tempValue.status = 'delivered';
      //     }
      //   }
      // }

      // tempValue.received = false;

      // if (tempValue.user._id === user._id) {
      //   if (tempValue.status === 'sent') {
      //     tempValue.sent = true;
      //   } else if (tempValue.status === 'delivered') {
      //     tempValue.sent = true;
      //     tempValue.received = true;
      //   } else if (tempValue.status === 'toBeSent') {
      //     tempValue.pending = true;
      //   }
      // }

      result.push(tempValue);

      return result;
    }, []);
};

export const getChats = createSelector(
  [realmMessages],
  messages => messages,
);
