import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Item, Input } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

export class SearchBar extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { active: false };
  // }

  // blurTextInput() {
  //   this._searchBar._root.blur();
  // }

  componentDidMount() {
    this._searchBar._root.focus();
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.blurInput) {
  //     this.blurTextInput();
  //   }
  // }

  render() {
    const { handleSearch, searchInput, handleSearchBarActive } = this.props;

    return (
      <View
        style={styles.searchBarContainer}
        onFocus={() => {
          handleSearchBarActive(true);
        }}
        onBlur={() => {
          handleSearchBarActive(false);
        }}
        searchBar
        rounded
      >
        <Item style={styles.searchBar}>
          <Icon name="ios-search" style={{ color: '#A8A8A8', fontSize: 18 }} />
          <Input
            testID={`${this.props.testID}`}
            placeholder="Search"
            placeholderTextColor="#9D9D9D"
            onChangeText={e => handleSearch(e)}
            value={searchInput}
            ref={c => (this._searchBar = c)}
            style={styles.searchInput}
            underlineColorAndroid="transparent"
          />
          {searchInput.length > 0 ? (
            <Icon
              style={{ color: 'gray', fontSize: 18 }}
              onPress={() => {
                handleSearch('');
                this._searchBar._root.focus();
              }}
              name="ios-close-circle"
            />
          ) : null}
        </Item>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'transparent',
    paddingTop: '5rem',
  },
  searchBar: {
    backgroundColor: '#F4F4F4',
    height: '38rem',
    borderRadius: '16rem',
    paddingLeft: '15rem',
    borderBottomColor: 'transparent',
  },
  searchInput: {
    fontSize: '14rem',
    lineHeight: '16rem',
    fontFamily: 'FiraSans-Regular',
    color: '#000',
  },
});
