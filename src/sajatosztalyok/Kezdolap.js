import React, {Component} from 'react';
import {Alert, Button, StyleSheet, View,Text} from 'react-native';

export default class ButtonBasics extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!');
  }

  render() {
    return (
        <View>
<Text style={{color:"darkgreen",fontSize:20,textAlign:"center",marginTop:10,marginLeft:100,marginRight:100,marginBottom:20}}>Készített:             Pogai Szabolcs</Text>
<Text style={{color:"darkred",fontSize:30,textAlign:"center",marginTop:5,marginLeft:100,marginRight:100,marginBottom:20}}>2023.01.27</Text>
<Text style={{color:"darkblue",fontSize:25,textAlign:"center",marginTop:5,marginLeft:25,marginRight:25,marginBottom:20}}>Debreceni SZC Baross Gábor Technikum, Szakképző Iskola és Kollégium</Text>

</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});