import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects';
import types from './Types';
import * as userActions from './Actions';
import { User, ContactThreads } from '../../Model';
import Api from '../../Middlewares/Api';
import * as contactOperations from '../Contacts/Operations';
import * as contactActions from '../Contacts/Actions';
import * as contactThreadActions from '../ContactThreads/Actions';
import Config from 'react-native-config';
import { Toast } from 'native-base';
import { realmDispatch } from '../../RealmStore';
import * as userOperations from '../User/Operations';
import { createUUID } from '../../Utils/CreateUUID';
import { dispatch } from '../../../State/ReduxStore';
import moment from 'moment';

export function* verifyOTP(action) {
  try {
    const response = yield call(Api.post, '/users/verifyotp', {
      mobile: action.payload.mobile,
      otp: action.payload.otp,
    });
    console.log('otp response', response);
    if (response) {
      let avatar = '';
      const avatarFromApi = response.data.user.profile_pic;
      if (avatarFromApi) {
        if (
          !(
            avatarFromApi.search('https://') !== -1 ||
            avatarFromApi.search('http://') !== -1
          )
        ) {
          avatar = `https://s3.ap-south-1.amazonaws.com/${
            Config.S3_BUCKET_PUBLIC
          }/users/${avatarFromApi}`;
        } else {
          avatar = avatarFromApi;
        }
      }
      let userAttributes = [];
      Object.entries(response.data.userAttributes).forEach(([key, value]) => {
        userAttributes.push({ name: key, value: value });
      });
      const userObj = {
        _id: response.data.user._id,
        mobile: action.payload.mobile,
        isLoggedin: response.data.user.is_verified,
        firstName: response.data.user.first_name || '',
        lastName: response.data.user.last_name || '',
        company: response.data.user.company || '',
        subtitle: response.data.user.subtitle || '',
        email: response.data.user.email || '',
        city: response.data.user.city || '',
        avatar,
        name: response.data.user.first_name
          ? response.data.user.last_name
            ? `${response.data.user.first_name} ${response.data.user.last_name}`
            : response.data.user.first_name
          : '',
        businessType: response.data.user.businessType,
        token: response.data.user.token,
        localAvatar: avatar,
        referralLink: response.data.user.referralLink,
        attributes: userAttributes,
        registeredOn: response.data.user.registeredOn,
      };
      console.log('USERREF', userObj);

      realmDispatch(userOperations.createUser(userObj));

      console.log('userAttributes', userAttributes);
      // realmDispatch(
      //   userOperations.addUserAttributes({ userAttributesData: userAttributes })
      // );
      const zonoBotContactObj = {
        ...response.data.botContact,
        isSpecialUser: true,
      };

      if (zonoBotContactObj._id) {
        // create a new contact thread of zonoBot
        // check if zonoBotContactObj has all required keys of contact schema
        const newMsg = {
          _id: createUUID(),
          system: true,
          text: 'Hello! This is Zono Bhai.',
          user: zonoBotContactObj,
          channelID: `${userObj._id}_${zonoBotContactObj._id}`,
          senderID: zonoBotContactObj._id,
          createdAt: moment(response.data.user.registeredOn).valueOf(),
          status: 'RCVDACKD',
        };

        const contactThreadObj = {
          _id: zonoBotContactObj._id,
          contact: { mobile: zonoBotContactObj.mobile },
          latestMessage: newMsg,
          unreadMessageCount: 1,
          chatChannel: {
            channelID:
              userObj._id < zonoBotContactObj._id
                ? `${userObj._id}_${zonoBotContactObj._id}`
                : `${zonoBotContactObj._id}_${userObj._id}`,
            private: true,
            toUser: { mobile: zonoBotContactObj.mobile },
            contactThreadID: zonoBotContactObj._id,
            latestMessage: newMsg,
            chatMessages: [newMsg],
            unreadMessageCount: 1,
          },
        };

        realmDispatch(
          contactActions.addContact({
            contacts: [zonoBotContactObj],
            contactThreads: [contactThreadObj],
            deleteContactThreads: [],
          })
        );
      }
      if (userObj._id) {
        action.payload.navigation.navigate('AuthLoading', {
          fromOTPScreen: true,
          activeReceiver: response.data.activeReceiver,
        });
      }
    } else {
      action.payload.stopVerifyOTP();
      yield put(userActions.errorVerifyOTP(error));
      Toast.show({
        text: 'Error verifying OTP.',
        buttonText: 'Please try again',
        duration: 2000,
      });
    }
  } catch (error) {
    action.payload.stopVerifyOTP();

    yield put(userActions.errorVerifyOTP(error));
    Toast.show({
      text: 'Error verifying OTP.',
      buttonText: 'Please try again',
      duration: 2000,
    });
  }
}


export function* updateDeviceInfo(action) {
  console.log('updateDeviceInfo ',action.payload);
  const response = yield call(
    Api.post,
    '',
    {fcm_token:action.payload.fcm_token,os_type:action.payload.os_type,os_version:action.payload.os_version},
    'route=user/userapi/updateDeviceInfo&user_token='+action.payload.token
  );

}
export function* updateLocation(action) {
  console.log('updateDeviceInfo ',action.payload);
  const response = yield call(
    Api.post,
    '',
    {latitude:action.payload.latitude,longitude:action.payload.longitude},
    'route=user/userapi/updateLocation&user_token='+action.payload.token
  );

  console.log("responde",response); 

}

export function* watchUser() {
  //  console.log('in User watcher');
  yield all([takeLatest(types.UPDATE_DEVICE_INFO, updateDeviceInfo),takeLatest(types.UPDATE_LOCATION, updateLocation)]);
}
