import { createSelector } from 'reselect';
import { cloneRealmObj } from '../../Model';

const realmContactThreads = contactThreads =>
  contactThreads.sorted('latestMessage.createdAt', false);

export const getContactThreads = createSelector(
  [realmContactThreads],
  contactThreads => contactThreads,
);

const realmOfferChannels = contactThread =>
  contactThread.offerChannels.sorted('latestMessage.createdAt', true);

export const getOfferChannels = createSelector(
  [realmOfferChannels],
  offerChannels => offerChannels,
);
