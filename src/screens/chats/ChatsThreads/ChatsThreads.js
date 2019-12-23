import React from 'react';
import ChatsThreadItem from './ChatsThreadItem';
import { FlatList, View, Text, StyleSheet } from 'react-native';

export default (ChatsThreads = props => {
  const { navigation, user } = props;
  let { contactThreads, contactThreadsLen } = props;

  renderContactThreadItem = ({ item, index }) => {
    const contactThreadName = item.contact ? item.contact.name : 'Unknown';
    return (
      <ChatsThreadItem
        contactThreadName={contactThreadName}
        navigation={navigation}
        user={user}
        contactThread={item}
      />
    );
  };

  return (
    <FlatList
      data={contactThreads}
      renderItem={this.renderContactThreadItem.bind(this)}
      //windowSize={3}
      // maxToRenderPerBatch={1}
      // initialNumToRender={8}
      keyExtractor={(item, index) => index.toString()}
      keyboardShouldPersistTaps="always"
    />
  );
});
