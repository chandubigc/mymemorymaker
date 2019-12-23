import React, { Component } from 'react';
import { TouchableOpacity, View, FlatList, Image } from 'react-native';
import { Thumbnail, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class SelectedImagesHorizontalView extends Component {
  render() {
    console.log('234', this.props.selectedImageName);
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'flex-end',
          }}
        >
          <FlatList
            horizontal
            ref={ref => (this.flatListRef = ref)}
            data={this.props.data}
            showsHorizontalScrollIndicator={false}
            extraData={{ selectedImageName: this.props.selectedImageName }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.selectedImage}
                onPress={() => this.props.handleSelectedImage(item.name)}
              >
                <View style={styles.thumbnailContainer}>
                  <Thumbnail
                    square
                    large
                    style={styles.thumbnail}
                    source={item.image}
                  />
                </View>
                {item.name === this.props.selectedImageName ? (
                  <Icon
                    name="ios-checkmark-circle"
                    style={{
                      position: 'absolute',
                      top: -2,
                      right: -2,
                      color: '#039be5',
                      fontSize: 20,
                    }}
                  />
                ) : null}
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: '10rem',
    paddingVertical: '10rem',
    // backgroundColor: '#F4F4F4',
    marginVertical: 10,
  },
  placeholderButton: {
    width: '70rem',
    height: '70rem',
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dadada',
    marginTop: '5rem',
  },
  selectedImage: {
    marginHorizontal: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailContainer: { marginTop: 5, marginRight: 5 },
  thumbnail: {
    borderColor: '#dadada',
    borderWidth: 1,
    height: '70rem',
    width: '70rem',
  },
  image: {
    alignSelf: 'center',
  },
});
