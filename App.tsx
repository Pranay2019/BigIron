/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import {
  View, Alert, TouchableHighlight, Text
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics'
import QuickActions from "react-native-quick-actions";
import { DeviceEventEmitter } from "react-native";

interface AppState {
  biometryType: any
}
interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props)
  }

  componentDidMount() {
    this.loginUsingTouchOrFaceID();
    this.addShortcutItems();
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
      </View>
    );
  }

  addShortcutItems() {
    DeviceEventEmitter.addListener("quickActionShortcut", data => {
      Alert.alert(data.title)
    });

    QuickActions.setShortcutItems([
      {
        type: "Home",
        title: "Home",
        icon: "",
        userInfo: {
          url: ""
        }
      },
      {
        type: "Search", 
        title: "Search",
        icon: "", 
        userInfo: {
          url: "" 
        }
      },
      {
        type: "My Account", 
        title: "Account", 
        icon: "", 
        userInfo: {
          url: ""
        }
      },
      {
        type: "Share", 
        title: "Share",
        icon: "", 
        userInfo: {
          url: ""
        }
      }
    ]);
  }

  loginUsingTouchOrFaceID() {
    ReactNativeBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject
        if (available && biometryType === ReactNativeBiometrics.TouchID || ReactNativeBiometrics.FaceID || ReactNativeBiometrics.Biometrics) {
          this.checkForBiometric();
        } else {
          Alert.alert('Biometrics not supported')
        }
      })
  }

  checkForBiometric() {
    ReactNativeBiometrics.simplePrompt({ promptMessage: 'Login using your face recognition' })
      .then((resultObject) => {
        const { success } = resultObject
        if (success) {
          Alert.alert('Login Success')
        } else {
          Alert.alert('Login Failed')
        }
      })
      .catch(() => {
        //Alert.alert('biometrics failed')
      })
  }
}