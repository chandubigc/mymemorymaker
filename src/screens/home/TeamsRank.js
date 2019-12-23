import React from 'react';
import { View, Image } from 'react-native';
import {
  ListItem,
  Text,
  Left,
  Body,
  Badge,
  Right,
  Icon,
  Card,
  Fab,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

export const TeamsRank = props => {
  const { navigation,teamData } = props;
  

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.teamsHeader}>
          <Text style={styles.teamHeaderText}>Team</Text>
          <Text style={styles.pointsHeaderText}>Points</Text>
          <Text style={styles.rankHeaderText}>Rank</Text>
        </View>
        <View style={styles.teams}> 
          {teamData.map((item, index) => {
            return (
              <View
              key={item.team_id}
                style={[
                  styles.teamsList,
                  index % 2 == 1
                    ? { backgroundColor: '#f3f3f3' }
                    : { backgroundColor: '#ffffff' },
                ]}
              >
                <Text style={styles.teamText}>{item.team_name}</Text>

                <Text style={styles.pointsText}> {item.points}</Text>

                <Text style={styles.rankText}>{item.rank}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    // flex: 1,
    margin: 5,
    padding: 10,
    // width: '90%',
    // backgroundColor: '#000',
  },
  teams: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  teamsHeader: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 0.2,
    padding: 5,
  },
  teamHeaderText: {
    flex: 2,
  },
  pointsHeaderText: {
    flex: 1,
  },
  rankheaderText: {
    flex: 1,
  },
  teamsList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  teamText: {
    flex: 2,
  },
  pointsText: {
    flex: 1,
    textAlign: 'center',
  },
  rankText: {
    flex: 1,
    textAlign: 'right',
  },
});
