import React, { Component } from 'react';

import { TouchableOpacity, View, Text, FlatList } from 'react-native';

import { Thumbnail } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class ContactsInGroup extends Component {
  render() {
    const { contacts, fromForward = false } = this.props;
    console.log('contacts', contacts);
    // let contactss = [
    //   { firstName: 'Anurag', mobile: '8y87' },
    //   {
    //     firstName: 'Anuragff',
    //     mobile: '8y8vh7',
    //   },
    // ];
    return this.props.contacts.length ? (
      <React.Fragment>
        <View style={styles.container}>
          <FlatList
            data={this.props.contacts}
            showsHorizontalScrollIndicator={false}
            ref={ref => (this.flatListRef = ref)}
            renderItem={({ item: rowData }) => (
              <TouchableOpacity style={styles.contact} onPress={() => {}}>
                <View>
                  <Thumbnail
                    medium
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 5,
                      borderColor: '#e0e0e0',
                      borderWidth: 3,
                    }}
                    source={
                      rowData.avatar && rowData.avatar !== ''
                        ? {
                            uri: rowData.avatar,
                          }
                        : require('../../Images/NoProfilePic.jpg')
                    }
                  />
                </View>
                <View>
                  <Text
                    style={styles.name}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {'   '}
                    {rowData.firstName}
                  </Text>
                  <Text style={styles.phoneNumber}>
                    {'   '}+91 {rowData.mobile}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {/* {this.props.canRemove ? <View style={styles.borderBottom} /> : null} */}
      </React.Fragment>
    ) : null;
  }
}

const styles = EStyleSheet.create({
  borderBottom: {
    borderBottomColor: '#A8A8A8',
    borderBottomWidth: '0.5rem',
    marginHorizontal: '10rem',
  },
  name: {
    lineHeight: '19rem',
    fontSize: '16rem',

    fontFamily: 'FiraSans-SemiBold',
    textAlign: 'left',
    color: '#383839',
  },
  container: {
    backgroundColor: '#fff',
    alignContent: 'center',
    marginLeft: '10rem',
    marginTop: '5rem',
    marginBottom: '150rem',
  },
  contact: {
    width: '70%',
    margin: '12rem',
    marginLeft: 0,
    marginBottom: '8rem',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  phoneNumber: {
    fontFamily: 'FiraSans-Regular',
    fontSize: '12rem',
    textAlign: 'left',
    color: '#383839',
  },
});
