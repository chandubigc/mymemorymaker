import React, { Component } from 'react';
import { ImageBackground, View, StatusBar } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon,
  Badge,
} from 'native-base';
import TeamHeader from './TeamHeader';

import { realmConnect } from 'realm-react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import TeamThreads from './TeamThreads/TeamThreads';
import { dispatch } from '../../State/ReduxStore';
import { bindActionCreators } from 'redux';
import ContactsInGroup from './ContactsInGroup';

import styles from './styles';

class MyTeam extends Component {
  render() {
    const { teams, navigation, user } = this.props;
    return (
      <Container style={styles.container}>
        <TeamHeader navigation={this.props.navigation} />
        <View style={{ flex: 1, backgroundColor: '#ededed' }}>
          {/* <TeamThreads teams={teams} navigation={navigation} user={user} /> */}
          <ContactsInGroup
            contacts={(teams[0] && teams[0].contacts) || []}
            navigation={navigation}
            user={user}
          />
        </View>
      </Container>
    );
  }
}

// const styles = EStyleSheet.create({
//   chatsContainer: { flex: 1, backgroundColor: '#f4f4f4' },
//   historySync: {
//     flexDirection: 'row',
//     backgroundColor: '#3686C1',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

function mapPropsToQueries(realm) {
  return [
    realm.objects('ContactGroups').sorted('latestMessage.createdAt', true),
    realm.objects('User'),
  ];
}

function mapQueriesToProps([contactGroups, user], props) {
  console.log('CONTACT GROUPS', contactGroups);
  return {
    teams: [
      contactGroups[0]
    ],
   // teams: contactGroups,
    user: user['0'],
  };
}

// function mapRealmDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {
//       createContactThread,
//     },
//     dispatch
//   );
// }

export default realmConnect(
  mapPropsToQueries,
  mapQueriesToProps
  // mapRealmDispatchToProps
)(MyTeam);
