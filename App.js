import React from "react";
import Setup from "./src/boot/setup";
import RNSplashScreen from "react-native-splash-screen";
export default class App extends React.Component {


  componentDidMount() {
    RNSplashScreen.hide();
 
  }

  render() {
    return <Setup />;
  }
}
