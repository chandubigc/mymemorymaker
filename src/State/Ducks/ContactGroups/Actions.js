import types from './Types';

export const writeContactGroupToDB = contactGroupData =>
  //  console.log('Writing contactGroup...');
  ({
    type: types.WRITE_CONTACTGROUP_TO_DB,
    payload: { contactGroupData },
  });
export const writeContactGroupFromServer = payload => {
  console.log('Writing contactGroup from Server...', payload);
  return {
    type: types.WRITE_CONTACTGROUP_FROM_SERVER,
    payload,
  };
};
export const updateContactGroupToDB = contactGroupData =>
  //  console.log('Updating contactGroupName...');
  ({
    type: types.UPDATE_CONTACTGROUP_TO_DB,
    payload: { contactGroupData },
  });
export const deleteContactGroupFromDB = contactGroupData =>
  //  console.log('removing contactGroup...', contactGroupData);
  ({
    type: types.DELETE_CONTACTGROUP_FROM_DB,
    payload: contactGroupData,
  });

export const syncGroupsFromServer = mobileNumbers => ({
  type: types.SYNC_GROUPS_FROM_SERVER,
  payload: mobileNumbers,
});
