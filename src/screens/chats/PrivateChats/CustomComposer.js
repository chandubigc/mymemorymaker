import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import { Platform, StyleSheet, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const MIN_COMPOSER_HEIGHT = Platform.select({
  ios: 33,
  android: 41,
});
const DEFAULT_PLACEHOLDER = 'Type a message...';

export default class Composer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: null,
      contactID: null,
    };
  }

  onContentSizeChange(e) {
    const { contentSize } = e.nativeEvent;

    // Support earlier versions of React Native on Android.
    if (!contentSize) {
      return;
    }

    if (
      !this.contentSize ||
      this.contentSize.width !== contentSize.width ||
      this.contentSize.height !== contentSize.height
    ) {
      this.contentSize = contentSize;
      this.props.onInputSizeChanged(this.contentSize);
    }
  }

  onChangeText(text) {
    // this.setState({ textValue: text });
    this.props.onTextChanged(text);
    this.props.onTextChange(text);
  }

  render() {
    console.log('PROPS TEXT CUSTOM COMPOSER', this.props.text);
    console.log('PROPS TEXTINPUT COMPOSER', this.props.textInputProps);

    var actionsStyle = this.props.keyboardState ? styles.actionsComposer : null;
    return (
      <TextInput
        testID={this.props.placeholder}
        // value={this.state.textValue}
        accessible
        accessibilityLabel={this.props.placeholder}
        placeholder={this.props.textFieldLabel}
        placeholderTextColor={this.props.placeholderTextColor}
        multiline
        onChange={e => this.onContentSizeChange(e)}
        onContentSizeChange={e => this.onContentSizeChange(e)}
        onChangeText={text => this.onChangeText(text)}
        style={[
          styles.textInput,
          this.props.textInputStyle,
          styles.defaultStyles,
          actionsStyle,
          {
            flexDirection: 'row',
            //alignItems: (this.props.VoiceEnabled || this.props.ActionsEnabled)? "flex-start": "center",
            justifyContent: 'flex-start',
            // letterSpacing: 0.5,
          },
        ]}
        autoFocus={this.props.textInputAutoFocus}
        value={this.props.text}
        enablesReturnKeyAutomatically
        underlineColorAndroid="transparent"
        keyboardAppearance={this.props.keyboardAppearance}
        {...this.props.textInputProps}
      />
    );
  }
}

const styles = EStyleSheet.create({
  actionsComposer: {
    //paddingVertical: '10rem',
    //minHeight: '80rem',
    justifyContent: 'flex-end',
    //backgroundColor: '#f4f4f4',
    //marginTop: '38rem',
    //textAlignVertical: 'top'
    //borderRadius: 5,
    //marginRight: 2,
  },
  textInput: {
    flex: 1,
    // width: 100,
    marginLeft: 10,
    // lineHeight: 16,
    paddingLeft: 10,
    marginTop: Platform.select({
      ios: 6,
      android: 2,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 2,
    }),
  },
  defaultStyles: {
    //height: 60,
    minHeight: '37rem',
    maxHeight: '120rem',
    width: '50rem',
    backgroundColor: '#ededed',
    fontFamily: 'FiraSans-Regular',
    // - fontSize: 18,
    //marginTop: 30,
    borderRadius: 5,
    paddingTop: 0,
    marginRight: 10,
    marginBottom: 0,
    padding: 0,
  },
});

Composer.defaultProps = {
  composerHeight: MIN_COMPOSER_HEIGHT,
  text: '',
  placeholderTextColor: '#b2b2b2',
  placeholder: DEFAULT_PLACEHOLDER,
  textInputProps: null,
  multiline: true,
  textInputStyle: {},
  textInputAutoFocus: false,
  keyboardAppearance: 'default',
  onTextChanged: () => {},
  onInputSizeChanged: () => {},
};

Composer.propTypes = {
  composerHeight: PropTypes.number,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  textInputProps: PropTypes.object,
  onTextChanged: PropTypes.func,
  onInputSizeChanged: PropTypes.func,
  multiline: PropTypes.bool,
  textInputStyle: TextInput.propTypes.style,
  textInputAutoFocus: PropTypes.bool,
  keyboardAppearance: PropTypes.string,
};
