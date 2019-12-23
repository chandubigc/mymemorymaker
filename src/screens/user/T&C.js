import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default class TermsAndCondtions extends React.Component {
  static navigationOptions = {
    title: 'Terms and Conditions',
  };
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{
            uri: 'https://www.zonoapp.com/user_policy.html',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
