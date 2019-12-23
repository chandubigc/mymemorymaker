import { createSelector } from 'reselect';

const contacts = (state) => {
  const result = [];
  Object.entries(state.contacts.entity.contact.byId).forEach(([key, value]) => {
    result.push(value);
  });
  return result;
};

export const getContactsState = createSelector(
  [contacts],
  byId =>
    byId.sort((a, b) => {
      const textA = a.first_name.toUpperCase();
      const textB = b.first_name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    }),
);
