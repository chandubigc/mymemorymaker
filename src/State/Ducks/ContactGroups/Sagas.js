import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects';

import types from './Types';
import * as groupActions from './Actions';
import * as userActions from '../User/Actions';
import { PubnubHistoryLog } from '../../Model';
import Api from '../../Middlewares/Api';
import { realmDispatch } from '../../RealmStore';
import moment from 'moment';


import { Toast } from 'native-base';
import { dispatch } from '../../ReduxStore';

export function* syncGroupsFromServer(action) {
  const phoneNumbersList = action.payload.tempMobileNos;
  console.log('in sync groups', phoneNumbersList);
  try {
    const response = yield Api.get('/contactgroups');
    if (response.data) {
      const groups = response.data.groups;

      const groupsList = [];
      const groupMemberships = response.data.groupMemberships;
      for (const group of groups) {
        const contactsObjArr = [];
        group.contacts.forEach(contact => {
          if (phoneNumbersList.indexOf(contact) !== -1) {
            contactsObjArr.push({
              mobile: contact,
            });
          }
        });

        const groupObj = {
          _id: group.groupId,
          name: group.name,
          avatar: group.avatar,
          contacts: contactsObjArr,
          syncStatus: 'sent',
          storageStatus: 'P', // non-Deleted Group
          updatedAt: moment(group.updatedAt).valueOf(),
          createdAt: group.createdAt ? moment(group.createdAt).valueOf() : 0,
          chatChannel: {
            channelID: `group_${group.groupId}`,
            group: true,
            contactGroupID: group.groupId,
            unreadMessageCount: 0,
          },
        };
        if (groupObj.contacts.length > 0) {
          groupsList.push(groupObj);
          groupMemberships.push({
            groupID: `group_${group.groupId}`,
            start: group.createdAt ? moment(group.createdAt).valueOf() : 0,
            end: 0,
          });
        }
      }
      console.log('GROUP MEMBER SHIPS', groupMemberships);
      PubnubHistoryLog.create(groupMemberships, true);
      // TODO: move this to realm writers and update isGroupSyncDone in same place
      yield realmDispatch(
        groupActions.writeContactGroupFromServer({
          groupsList,
          userId: action.payload.userId,
        })
      );
      // realmDispatch(userActions.updateUser({
      //     _id: action.payload.userId,
      //     isGroupSyncDone: true,
      //   }));

      // dispatch(
      //   toggleConnection({
      //     userId: action.payload.userId,
      //     fcmToken: '',
      //   })
      // );
    }
  } catch (e) {
    realmDispatch(
      userActions.updateUser({
        _id: action.payload.userId,
        isGroupSyncDone: false,
      })
    );
    Toast.show({
      text: 'Groups sync failed',
      buttonText: '',
    });
  }
}

export function* watchGroupActions() {
  //  console.log('in watcher get Groups');
  yield all([takeLatest(types.SYNC_GROUPS_FROM_SERVER, syncGroupsFromServer)]);
}
