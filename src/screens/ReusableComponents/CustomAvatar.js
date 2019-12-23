import React from 'react';
import { Avatar } from 'react-native-elements';

export const CustomAvatar = props => {
  const { source, updatedAt } = props;
  if (source && source.uri) {
    if (updatedAt) {
      source.uri += `?updatedAt=${updatedAt}`;
    } else {
      source.uri += `?updatedAt=${0}`;
    }
  }
  return <Avatar {...props} />;
};
