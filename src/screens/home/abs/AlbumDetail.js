import React, { Component } from 'react';
import { Text, View, Image, Linking,Dimensions } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const deviceWidth = Dimensions.get("window").width;
const imgHeight =  (deviceWidth *(2/3));

class AlbumDetail extends Component {
  render() {
    const { title, artist, thumbnail_image, image,id } = this.props.album;
    const {
      thumbnailStyle,
      headerContentStyle,
      tumbnailContainerStyle,
      headerTextStyle,
      imageStyle
    } = styles;

    return (
      
      <Card>
         <CardSection>
          <Image style={imageStyle} source={{ uri: image }} />
        </CardSection>
        <CardSection>
    <Button onPress={() => this.props.onPressItem(id,title)}>{title}</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  tumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: imgHeight,
    flex: 1,
    width: deviceWidth
  }
};

export default AlbumDetail;
