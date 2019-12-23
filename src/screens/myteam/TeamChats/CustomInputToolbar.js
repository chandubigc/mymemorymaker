/* eslint-disable no-tabs */
import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Keyboard,
  ViewPropTypes,
  Text,
  Platform,
  Animated,
  Easing,
  findNodeHandle,
  NativeModules,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import { Send, Actions } from 'react-native-gifted-chat';
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomComposer from './CustomComposer';
let i = 0;

export default class InputToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 'absolute',
      animating: false,
      textFieldLabel: false,
      keyboardState: false,
      text: '',
      disableAnimation: true,
    };
  }
  componentDidMount() {
    //this.showPopOvers();
    //this.voicePermission();
    console.log('COMPONENT DID MOUNT IS HAPPENING NOW');
  }

  componentWillMount() {
    //this.voicePermission();
    console.log('COMPONENT DID MOUNT IS HAPPENING NOW');
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.animatedValue2 = new Animated.Value(5);
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );

    this.props.navigation.addListener('willFocus', payload => {
      // alert('focus');
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide
      );
    });
    this.props.navigation.addListener('willBlur', payload => {
      // alert('blur');
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    });
  }

  componentWillUnmount() {
    this.props.navigation.addListener('willBlur').remove();
    this.props.navigation.addListener('willFocus').remove();
  }

  keyBoardSetState = keyboardState => {
    this.setState({ keyboardState: keyboardState });
  };

  _keyboardDidHide = () => {
    this.keyBoardSetState(false);
    console.log('Went inside');
    const text = this.state.text.length > 0;
    Animated.timing(this.animatedValue2, {
      toValue: 5,
      duration: 150,
      erasing: Easing.ease,
    }).start();
    this.setState({
      textFieldLabel: text,
      opacity: 1,
    });
  };

  _keyboardDidShow = () => {
    this.keyBoardSetState(true);
    Animated.timing(this.animatedValue2, {
      toValue: -150,
      duration: 150,
      erasing: Easing.exp,
    }).start();
    setTimeout(
      () =>
        this.setState({
          textFieldLabel: true,
          opacity: 0,
        }),
      10
    );
  };

  setTextEmpty = () => {
    console.log(
      '-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-s-'
    );
    this.setState({
      text: '',
    });
  };

  renderSend() {
    //this.props.voiceEnable(0);
    if (this.props.renderSend) {
      return this.props.renderSend(
        this.props,
        this.state.text,
        this.setTextEmpty
      );
    }
    return <Send {...this.props} />;
  }

  onTextChanged = text => {
    this.setState({ text: text });
  };

  renderComposer() {
    return (
      <CustomComposer
        textFieldLabel={'Type message...'}
        textInputStyle={[
          styles.composer,
          this.state.textFieldLabel ? styles.bigFont : styles.smallFont,
        ]}
        textInputProps={{ placeholderTextColor: '#9D9D9D' }}
        onFocusTextInput={this.onFocusTextInput}
        // textChangeHandler={this.onTextChanged}
        {...this.props}
        //  text={this.props.text}
        onTextChange={this.onTextChanged}
        keyboardState={this.state.keyboardState}
        // tempText={this.state.tempText}
      />
    );
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>
      );
    }
    return null;
  }

  render() {
    console.log(
      'Text-------------------------------------------------------------------------------------------------------------------',
      this.state.text
    );
    return (
      <View
        style={[
          {
            // height: this.state.keyboardState? '30%': null,
          },
          styles.container,
          this.props.containerStyle,
          {
            justifyContent: this.state.keyboardState ? 'flex-start' : 'center',
            alignItems: 'flex-start',
            position: this.state.position,
          },
        ]}
      >
        <View style={[styles.primary, this.props.primaryStyle]}>
          {this.renderComposer()}
          {this.renderSend()}
        </View>
        {this.renderAccessory()}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  actionsButtons: {
    paddingRight: 50,
  },
  toolBar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34aa54',
    height: '36rem',
    borderRadius: '5rem',
  },
  voiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '60rem',
    paddingBottom: '80rem',
    height: '220rem',
  },
  circularbutton: {
    marginRight: '20rem',
    marginLeft: '5rem',
  },
  plusIconStyle: {
    backgroundColor: '#ededed',
    width: '36rem',
    height: '36rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5rem',
    //backgroundColor: 'red'
  },
  crossIconStyle: {
    backgroundColor: '#f4f4f4',
    width: '36rem',
    height: '36rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5rem',
  },
  langtext: {
    fontSize: 11,
    fontFamily: 'FiraSans-Bold',
    color: '#ffffff',
  },
  voiceButton: {
    marginRight: '40rem',
    height: '120rem',
    width: '120rem',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 60,
    borderColor: 'white',
    elevation: 0,
  },
  mic: {
    fontSize: '30rem',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#4297d6',
    borderRadius: 35,
  },
  languageButtons: {
    flexDirection: 'row',
  },
  langTopRow: {
    paddingRight: 10,
  },
  actionsButtonSize: {
    backgroundColor: '#3686c1',
    borderRadius: 5,
    width: '33rem',
    height: '33rem',
  },
  actionsButtonSizeWithoutBackground: {
    width: '33rem',
    height: '33rem',
  },
  actionsIcon: {
    color: '#ffffff',
    fontSize: '20rem',
    marginRight: '-5rem',
    marginLeft: '12rem',
  },
  actionsIconWithoutBackground: {
    color: '#3686c1',
    fontSize: '33rem',
    marginRight: '-5rem',
    marginLeft: '0rem',
  },
  buttonSize: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    backgroundColor: '#727272',
    borderRadius: 5,
  },
  langButtonTopPad: {
    marginBottom: 10,
    width: 50,
    height: 30,
  },
  actionsButtonsRow: {
    marginBottom: 35,
  },
  container: {
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: '#b2b2b2',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: '65rem',
    //justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ededed',
    // marginBottom: 5,
    // marginTop: 5,
  },
  primary: {
    flexDirection: 'row',
    // height: '50rem',
    alignItems: 'center',
    paddingVertical: '12rem',
  },
  accessory: {
    height: 44,
  },
  popoverText: {
    color: '#fff',
    fontSize: '14rem',
    lineHeight: 18,
    padding: 6,
    fontFamily: 'FiraSans-Regular',
  },
  popoverIcon: {
    position: 'absolute',
    color: '#4298d8',
    fontSize: 40,
    top: 10,
  },
  popoverConatiner: {
    backgroundColor: '#4298d8',
    color: '#fff',
    borderRadius: 6,
    position: 'absolute',
    fontSize: 30,
    top: -35,
  },
  composer: {
    //backgroundColor: '#f4f4f4',
    backgroundColor: '#fff',
    borderRadius: '30rem',
    // borderWidth: 1,
    // borderColor: '#ededed',
    fontSize: '15rem',
    flex: 1,
    minHeight: '40rem',
    paddingLeft: '5rem',
    marginTop: Platform.select({
      ios: 6,
      android: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 0,
    }),
  },
  smallFont: { fontSize: '14rem' },
  bigFont: { fontSize: '18rem' },
});

InputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {},
  onPressActionButton: () => {},
};

InputToolbar.propTypes = {
  renderAccessory: PropTypes.func,
  renderActions: PropTypes.func,
  renderSend: PropTypes.func,
  renderComposer: PropTypes.func,
  onPressActionButton: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  primaryStyle: ViewPropTypes.style,
  accessoryStyle: ViewPropTypes.style,
};
