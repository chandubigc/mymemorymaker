import {createSelector} from 'reselect';
import _ from 'lodash';
import {Contacts, DealAlerts} from '../../../State/Model';
import {getContactName, getContactNameSearch} from '../../Utils/getContactName';

export const excludeContacts = props => {
  const {
    addChannel,
    dealItem,
    addThirdParty,
    channelItem,
    isParty,
  } = props.navigation.state.params;

  const postSupply = props.navigation.state.params.item !== undefined
    ? props.navigation.state.params.item
    : props.navigation.state.params.ProductState;

  // //  console.log ('post Supply Selectors', addThirdParty);

  let excludedContacts = [];
  // //  console.log ('dealItem', dealItem);
  //  console.log('channelItem', channelItem);
  // //  console.log ('props', props.navigation.state.params);

  if (isParty) {
    const dealItem = DealAlerts.byPK (channelItem.dealID);

    const excludeList = [channelItem.toUser._id, dealItem.owner._id];

    const thirdPartyUserIds = channelItem.thirdPartyUsers.map (
      t => t.contact._id
    );

    excludedContacts = [...thirdPartyUserIds, ...excludeList];
  } else if (addThirdParty) {
    const dealItem = DealAlerts.byPK (channelItem.dealID);

    const excludeList = [channelItem.toUser._id, dealItem.owner._id];

    if (dealItem.party !== null && dealItem.party !== undefined) {
      excludeList.push (dealItem.party._id);
    }

    const thirdPartyUserIds = channelItem.thirdPartyUsers.map (
      t => t.contact._id
    );

    excludedContacts = [...thirdPartyUserIds, ...excludeList];

    // channelsContacts;
    // //  console.log ('exclusionIds third party', excludedContacts);
  } else {
    excludedContacts = postSupply.firstContact !== undefined
      ? [postSupply.firstContact._id]
      : [];
  }

  return excludedContacts;
};

export const sectionedList = (contacts, contactGroups, user, props) => {
  const {
    addChannel,
    dealItem,
    addThirdParty,
    channelItem,
  } = props.navigation.state.params;

  const postSupplyDealObj = props.navigation.state.params.item !== undefined
    ? props.navigation.state.params.item
    : props.navigation.state.params.ProductState;

  // //  console.log ('post Supply Selectors', postSupply);

  let excludedContacts = [];

  if (addChannel) {
    const channelsContacts = dealItem.dealChannels.map (t => t.toUser._id);
    if (dealItem.party !== null && dealItem.party !== undefined) {
      excludedContacts = [...channelsContacts, dealItem.party._id];
    } else {
      excludedContacts = [...channelsContacts];
    }
    // channelsContacts;
    // //  console.log ('exclusionIds channel', excludedContacts);
    // //  console.log ('dealItem', dealItem);
  } else if (addThirdParty) {
    const dealItem = DealAlerts.byPK (channelItem.dealID);

    const excludeList = [channelItem.toUser._id, dealItem.owner._id];

    if (dealItem.party !== null && dealItem.party !== undefined) {
      excludeList.push (dealItem.party._id);
    }

    const thirdPartyUserIds = channelItem.thirdPartyUsers.map (
      t => t.contact._id
    );

    excludedContacts = [...thirdPartyUserIds, ...excludeList];
  } else {
    excludedContacts = postSupplyDealObj.firstContact !== undefined
      ? [postSupplyDealObj.firstContact._id]
      : [];
  }

  // const contactsList = contacts.map (t => t);

  const contactsList = contacts
    .filtered (`mobile != '${user['0'].mobile}' AND isSpecialUser != true AND inPhoneBook == true`)
    .sorted ('lastAccessedTime', true)
    .filter (t => {
      const isPresent = excludedContacts.find (i => t._id === i);
      if (isPresent) {
        return false;
      }
      return true;
    }) || [];

  // //  console.log ('contactsList', contactsList);
  const index = contactsList.findIndex (
    contact => contact.lastAccessedTime === 0
  );
  const frequentContactsList = index > 0
    ? index > 7 ? contactsList.slice (0, 7) : contactsList.slice (0, index)
    : [];

  // Contact groups
  let contactGroupsList = [];

  if (excludedContacts.length) {
    contactGroupsList = contactGroups.filter (group => {
      const contactsInGroup = group.contacts.map (t => {
        if (t.length !== 10) {
          return t;
        }
        const conObject = Contacts.byPK (t);
        return conObject._id;
      });
      const isEmptyGroup = _.difference (contactsInGroup, excludedContacts);
      if (isEmptyGroup.length) {
        return true;
      }
      return false;
    });
  } else {
    contactGroupsList = contactGroups.slice ();
  }

  // //  console.log ('after removal groups', contactGroupsList);

  const frequentContactGroups = contactGroupsList.slice (0, 2);

  const normalizedFrequentContactGroupsList = frequentContactGroups.map (t => ({
    _id: t._id,
    firstName: t.name,
    avatar: t.avatar,
    contacts: t.contacts,
    updatedAt: t.updatedAt,
    syncStatus: t.syncStatus,
    storageStatus: t.storageStatus,
    type: 'group',
  }));

  // //  console.log ('NormalizedFreqGroup', normalizedFrequentContactGroupsList);

  const normalizedContactGroupsList = contactGroupsList.map (t => ({
    _id: t._id,
    firstName: t.name,
    avatar: t.avatar,
    contacts: t.contacts,
    updatedAt: t.updatedAt,
    syncStatus: t.syncStatus,
    storageStatus: t.storageStatus,
    type: 'group',
  }));

  // //  console.log ('NormalizedContactGroup', normalizedContactGroupsList);

  // combine

  const finalFrequentConList = _.concat (
    frequentContactsList,
    normalizedFrequentContactGroupsList
  );
  const finalConList = _.concat (contactsList, normalizedContactGroupsList);

  // //  console.log ('final frequent con no sorting', finalFrequentConList);
  // //  console.log ('final con no sorting ', finalConList);

  // Sorting

  const sortedFrequentConList = _.sortBy (finalFrequentConList, 'firstName');
  const sortedConList = _.sortBy (finalConList, 'firstName');

  // //  console.log ('final frequent con  sorting', sortedFrequentConList);
  // //  console.log ('final con  sorting ', sortedConList);

  // section list data

  // ////  console.log ('Anurag section list forming.....');

  const list = [];

  list.push ({title: 'Recently Viewed', data: sortedFrequentConList});
  for (i = 0; i < 26; i++) {
    list.push ({title: String.fromCharCode (Number (65) + i), data: []});
  }
  list.push ({title: String.fromCharCode (35), data: []});

  // ////  console.log ('list', list);

  const sectionedList = sortedConList.reduce ((list, sortedCon, index) => {
    const listItem = list.find (item => {
      const contactName = sortedCon.type === 'group'
        ? sortedCon.firstName
        : getContactName (sortedCon);

      return (
        item.title && item.title === contactName.slice (0, 1).toUpperCase ()
      );
    });

    if (listItem) {
      listItem.data.push (sortedCon);
    } else {
      list[27].data.push (sortedCon);
    }

    return list;
  }, list);

  // ////  console.log ('realm props sectionlist', sectionedList);

  const filteredSectionedList = sectionedList.filter (t => t.data.length > 0);
  // //  console.log ('filteredSectionList', filteredSectionedList);
  return filteredSectionedList;
};

export const searchSectionedList = (contacts, contactGroups, user, props) => {
  const {
    addChannel,
    dealItem,
    addThirdParty,
    channelItem,
  } = props.navigation.state.params;

  const postSupplyDealObj = props.navigation.state.params.item !== undefined
    ? props.navigation.state.params.item
    : props.navigation.state.params.ProductState;

  let excludedContacts = [];
  // //  console.log ('dealItem', dealItem);
  // //  console.log ('channelItem', channelItem);
  // //  console.log ('props', props.navigation.state.params);

  if (addChannel) {
    const channelsContacts = dealItem.dealChannels.map (t => t.toUser._id);
    if (dealItem.party !== null && dealItem.party !== undefined) {
      excludedContacts = [...channelsContacts, dealItem.party._id];
    } else {
      excludedContacts = [...channelsContacts];
    }
    // channelsContacts;
    // //  console.log ('exclusionIds channel', excludedContacts);
    // //  console.log ('dealItem', dealItem);
  } else if (addThirdParty) {
    const dealItem = DealAlerts.byPK (channelItem.dealID);

    const excludeList = [channelItem.toUser._id, dealItem.owner._id];

    if (dealItem.party !== null && dealItem.party !== undefined) {
      excludeList.push (dealItem.party._id);
    }

    const thirdPartyUserIds = channelItem.thirdPartyUsers.map (
      t => t.contact._id
    );

    excludedContacts = [...thirdPartyUserIds, ...excludeList];

    // channelsContacts;
    //  ////  console.log ('exclusionIds third party', channelsContacts);
  } else {
    excludedContacts = postSupplyDealObj.firstContact !== undefined
      ? [postSupplyDealObj.firstContact._id]
      : [];
  }

  // const contactsList = contacts.map (t => t);

  const contactsList = contacts
    .filtered (`mobile != '${user['0'].mobile}' AND isSpecialUser != true AND inPhoneBook == true`)
    .sorted ('lastAccessedTime', true)
    .filter (t => {
      const isPresent = excludedContacts.find (i => t._id === i);
      if (isPresent) {
        return false;
      }
      return true;
    }) || [];
  // ////  console.log ('contacts List New', contactsListNew);

  //  const contactsList = contacts.map (t => t);

  // ////  console.log ('contacts List', contactsList);

  // ContactGroups

  let contactGroupsList = [];

  if (excludedContacts.length) {
    contactGroupsList = contactGroups.filter (group => {
      const contactsInGroup = group.contacts.map (t => {
        if (t.length !== 10) {
          return t;
        }
        const conObject = Contacts.byPK (t);
        return conObject._id;
      });
      const isEmptyGroup = _.difference (contactsInGroup, excludedContacts);
      if (isEmptyGroup.length) {
        return true;
      }
      return false;
    });
  } else {
    contactGroupsList = contactGroups.slice ();
  }

  // //  console.log ('after removal groups', contactGroupsList);

  // / Normalization

  const normalizedContactgroupsList = contactGroupsList.map (t => ({
    _id: t._id,
    firstName: t.name,
    avatar: t.avatar,
    contacts: t.contacts,
    type: 'group',
  }));

  // ////  console.log ('NormalizedContactGroup', normalizedContactgroupsList);

  // check for tappit user

  const groupedContactsList = _.groupBy (contactsList, 'isTappitUser');

  // ////  console.log ('groupedContactsList', groupedContactsList);

  const contactsNonTappitList = groupedContactsList.false !== undefined &&
    groupedContactsList.false !== null
    ? groupedContactsList.false
    : [];
  const contactsTappitList = groupedContactsList.true !== undefined &&
    groupedContactsList.true !== null
    ? groupedContactsList.true
    : [];

  // ////  console.log ('contactNonTappitList', contactsNonTappitList);
  // ////  console.log ('contactsTappitList', contactsTappitList);

  // ////  console.log ('Anurag Search section list forming.....');

  // Converting to SearchSectionList
  const searchSectionedList = [
    {title: 'Contacts', data: contactsTappitList},
    {title: 'Groups', data: normalizedContactgroupsList},
    {title: 'Non-Zono Contacts', data: contactsNonTappitList},
  ];

  //  ////  console.log ('search sectionlist', searchSectionedList);

  const filteredSearchSectionedList = searchSectionedList.filter (
    t => t.data.length > 0
  );
  // //  console.log ('filteredSectionList', filteredSearchSectionedList);
  return filteredSearchSectionedList;
};

export const sectionedContactsList = (contacts, user, props) => {
  const isParty = props.navigation.getParam ('isParty', false);
  const addThirdParty = props.navigation.getParam ('addThirdParty', null);

  const channelItem = props.navigation.getParam ('channelItem', null);
  let excludedContacts = [];
  if (isParty || addThirdParty) {
    const dealItem = DealAlerts.byPK (channelItem.dealID);

    const excludeList = [channelItem.toUser._id, dealItem.owner._id];

    const thirdPartyUserIds = channelItem.thirdPartyUsers.map (
      t => t.contact._id
    );

    excludedContacts = [...thirdPartyUserIds, ...excludeList];
  }
  const contactsList = contacts
    .filtered (`mobile != '${user['0'].mobile}' AND isSpecialUser != true AND inPhoneBook == true`)
    .sorted ('firstName', false)
    .filter (t => {
      const isPresent = excludedContacts.find (i => t._id === i);
      if (isPresent) {
        return false;
      }
      return true;
    });

  // section Contact list data

  // ////  console.log ('Anurag section Contact list forming.....');

  const list = [];

  for (i = 0; i < 26; i++) {
    list.push ({title: String.fromCharCode (Number (65) + i), data: []});
  }
  list.push ({title: String.fromCharCode (35), data: []});

  // ////  console.log ('list', list);

  const sectionedContactsList = contactsList.reduce ((list, contact, index) => {
    const listItem = list.find (item => {
      const contactName = getContactNameSearch (contact);
      return (
        item.title && item.title === contactName.slice (0, 1).toUpperCase ()
      );
    });

    if (listItem) {
      listItem.data.push (contact);
    } else {
      list[26].data.push (contact);
    }

    return list;
  }, list);

  //  ////  console.log ('realm props sectionlist', sectionedContactsList);

  const filteredSectionedContactsList = sectionedContactsList.filter (
    t => t.data.length > 0
  );
  // //  console.log ('filteredSectionList', filteredSectionedContactsList);
  return filteredSectionedContactsList;
};

export const contactsInGroupList = groupSelected => {
  const contactsInGroupList = Array.from (groupSelected.contacts);
  return contactsInGroupList;
};

export const toExcludeContacts = createSelector (
  [excludeContacts],
  contacts => contacts
);

export const toSectionedList = createSelector (
  [sectionedList],
  secList => secList
);

export const toSectionedContactsList = createSelector (
  [sectionedContactsList],
  secList => secList
);

export const toSearchSectionedList = createSelector (
  [searchSectionedList],
  secList => secList
);

export const toContactsInGroupList = createSelector (
  [contactsInGroupList],
  secList => secList
);

export const toSectionedContactsInGroupList = createSelector (
  [contactsInGroupList],
  contactsInGroupList => {
    const list = [];

    for (i = 0; i < 26; i++) {
      list.push ({title: String.fromCharCode (Number (65) + i), data: []});
    }
    list.push ({title: String.fromCharCode (35), data: []});

    //   ////  console.log ('list', list);

    const sectionedList = contactsInGroupList.reduce (
      (list, contact, index) => {
        const listItem = list.find (
          item =>
            item.title && item.title === contact.firstName[0].toUpperCase ()
        );

        if (listItem) {
          listItem.data.push (contact);
        } else {
          list[26].data.push (contact);
        }

        return list;
      },
      list
    );

    const filteredSectionedList = sectionedList.filter (t => t.data.length > 0);
    //  //  console.log ('filteredSectionList', filteredSectionedList);
    return filteredSectionedList;
  }
);
