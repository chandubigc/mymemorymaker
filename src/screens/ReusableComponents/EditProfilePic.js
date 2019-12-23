// import React from 'react';
// import {
//   TouchableOpacity,
//   Modal,
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import { Thumbnail, Icon, ActionSheet, Toast } from 'native-base';
// import ImagePicker from 'react-native-image-crop-picker';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import UploadToS3 from '../../State/Utils/UploadToS3';
// import Api from '../../State/Middlewares/Api';
// import ImageResizer from 'react-native-image-resizer';
// import { DeleteFile } from '../../State/Utils/DeleteFile';
// import { ResizeImages } from '../../State/Utils/ResizeImages';
// import EStyleSheet from 'react-native-extended-stylesheet';

// export default class EditProfilePic extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       localAvatar: props.user.localAvatar,
//       isLoading: false,
//     };
//     this.onActionsPress = this.onActionsPress.bind(this);
//     this.updateUser = this.updateUser.bind(this);
//   }

//   async getSignedUrlThenUploadToS3(image) {
//     const fileExt = image.mime.split('/')[1];

//     const file = {
//       uri: image.path,
//       name: `${this.props.user._id}.${fileExt}`,
//       type: image.mime,
//     };

//     const filename = `${this.props.user._id}.${fileExt}`;

//     try {
//       const getSignedUrlResponse = await Api.post('/users/presignedurl', {
//         filename: `/${filename}`,
//         type: 'image',
//         contenttype: file.type,
//         destination: 'users',
//         method: 'put',
//       });

//       //  console.log('getsignedurlresponse', getSignedUrlResponse);
//       this.setState({
//         isLoading: true,
//       });

//       const isUploaded = await UploadToS3(
//         getSignedUrlResponse.data.presignedurl,
//         file
//       );

//       if (isUploaded) {
//         this.updateUser(image, filename);
//       }
//     } catch (e) {
//       Toast.show({
//         text: 'Not connected to Internet.',
//         buttonText: 'Try Again',
//       });
//     }
//   }

//   updateUser(image, filename) {
//     this.setState({ localAvatar: image.path, isLoading: false }, () => {
//       this.props.updateAvatar({
//         _id: this.props.user._id,
//         avatar: filename,
//         localAvatar: image.path,
//       });
//     });
//   }

//   openCamera() {
//     ImagePicker.openCamera({
//       useFrontCamera: true,
//     }).then(image => {
//       this.props.navigation.navigate(
//         this.props.fromAccountScreen ? 'ImageSender' : 'CropImage',
//         {
//           images: [image],
//           galleryOrCamera: 'camera',
//           storeAndSend: this.handleCroppedImage,
//           avatar: null,
//           removeText: true,
//           addImage: false,
//           removeAvatar: true,
//         }
//       );
//     });
//   }

//   openGallery() {
//     ImagePicker.openPicker({
//       multiple: false,
//       mediaType: 'photo',
//     })
//       .then(image => {
//         this.props.navigation.navigate(
//           this.props.fromAccountScreen ? 'ImageSender' : 'CropImage',
//           {
//             images: [image],
//             galleryOrCamera: 'gallery',
//             storeAndSend: this.handleCroppedImage,
//             avatar: null,
//             removeText: true,
//             addImage: false,
//             removeAvatar: true,
//           }
//         );
//       })
//       .catch(e => console.log(e));
//   }

//   handleCroppedImage = image => {
//     const newImage = {
//       uri: image[0].path,
//       width: image[0].width,
//       height: image[0].height,
//       mime: image[0].mime,
//       size: image[0].size,
//       modificationDate: new Date().getTime(),
//       path: image[0].path,
//     };
//     this.getSignedUrlThenUploadToS3(newImage);
//   };

//   onActionsPress() {
//     ActionSheet.show(
//       {
//         options: [
//           {
//             text: 'Attach Photo',
//             icon: 'ios-folder-open',
//           },
//           {
//             text: 'Take Photo',
//             icon: 'ios-camera',
//           },
//         ],
//         title: 'Update Profile Picture',
//       },
//       buttonIndex => {
//         if (buttonIndex === 0) {
//           this.openGallery();
//         } else if (buttonIndex === 1) {
//           this.openCamera();
//         }
//       }
//     );
//   }

//   render() {
//     const { user, thumbnailContainerStyle, iconContainerStyle } = this.props;

//     return (
//       <React.Fragment>
//         <View>
//           <Thumbnail
//             large
//             style={{
//               borderColor: '#eee',
//               borderWidth: 1,
//               ...thumbnailContainerStyle,
//             }}
//             source={
//               this.state.localAvatar
//                 ? {
//                     uri: this.state.localAvatar,
//                   }
//                 : require('../../Images/NoProfilePic.jpg')
//             }
//           />
//           <TouchableOpacity
//             style={{ ...styles.wrapper, ...iconContainerStyle }}
//             onPress={this.onActionsPress}
//           >
//             <Icon
//               name="ios-camera"
//               style={{
//                 color: '#fff',
//               }}
//             />
//           </TouchableOpacity>
//           {this.state.isLoading ? (
//             <ActivityIndicator
//               style={styles.indicator}
//               size="large"
//               color="#fff"
//             />
//           ) : null}
//         </View>
//       </React.Fragment>
//     );
//   }
// }

// EditProfilePic.defaultProps = {
//   thumbnailContainerStyle: {},
//   iconContainerStyle: {},
//   updateUser: () => {},
// };

// const styles = EStyleSheet.create({
//   wrapper: {
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 40,
//     height: 40,
//     backgroundColor: '#00ac47',
//     borderRadius: 100,
//   },
//   actionsItemContainer: {
//     width: '50%',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   actionsBorderRight: {
//     borderRightColor: '#eee',
//     borderRightWidth: 1,
//   },
//   actionsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     flexDirection: 'row',
//   },
//   indicator: {
//     position: 'absolute',
//     top: 45,
//     left: 45,
//   },
// });
