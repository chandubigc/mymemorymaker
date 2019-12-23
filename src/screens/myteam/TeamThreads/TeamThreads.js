import React from 'react';
import TeamThreadItem from './TeamThreadItem';
import { FlatList, View, Text, StyleSheet } from 'react-native';

export default (TeamThreads = props => {
  const { navigation, user } = props;
  let { teams } = props;

  renderTeamItem = ({ item, index }) => {
    return (
      <TeamThreadItem
        teamName={item.name}
        navigation={navigation}
        user={user}
        team={item}
      />
    );
  };

  return (
    <FlatList
      data={teams}
      renderItem={this.renderTeamItem.bind(this)}
      //windowSize={3}
      // maxToRenderPerBatch={1}
      // initialNumToRender={8}
      keyExtractor={(item, index) => index.toString()}
      keyboardShouldPersistTaps="always"
    />
  );
});
