import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity,TextInput,SafeAreaView,
  ScrollView,}
from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ipcim from './Ipcim';
const IP=require('./Ipcim')

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={
         isLoading: true,
         valaszto:1,
        dataSource:[],

         bevitel1:"",
         bevitel2:0,
         bevitel3:0,
         bevitel4:0,
         bevitel5:""
        
        }
  }
  feltoltes=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:this.state.bevitel1,
    }

  fetch(IP.ipcim + 'tipus', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }
  componentDidMount(){
    return fetch(IP.ipcim + 'tipus2')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

felvitel=()=>{
   // alert("Hello")
    var bemenet={
      bevitel1:this.state.bevitel1,
      bevitel2:this.state.valaszto,
      bevitel3:this.state.bevitel3,
      bevitel4:this.state.bevitel4,
      bevitel5:this.state.bevitel5,
    }

  fetch(IP.ipcim + 'feltoltes', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => {
  alert(y);
  
  }
  )
}

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(

      <View style={{flex: 1, paddingTop:20}}>
          {/*------------------------------------------------------------------------Keresés*/}
          <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
          <Text style={{color:"green",fontSize:20,textAlign:"center",marginTop:10,marginLeft:100,marginRight:100,marginBottom:20}}>Étel neve:</Text>
          <TextInput
        style={{height:40,marginLeft:120,marginRight:120,marginBottom:10}}
        placeholder="Név"
        onChangeText={(beirtszoveg)=>this.setState({bevitel1:beirtszoveg})}
        value={this.state.bevitel1}
      />
      <Text style={{color:"green",fontSize:20,textAlign:"center",marginTop:10,marginLeft:100,marginRight:100,marginBottom:20}}>Étel tipusa:</Text>
      <TextInput
        style={{height:40,marginLeft:120,marginRight:120,marginBottom:10}}
        placeholder="Tipus"
        onChangeText={(beirtszoveg)=>this.setState({bevitel2:beirtszoveg})}
        value={this.state.bevitel2}
      />
      <Picker 
                style={{backgroundColor:"#42adf5",color:"white",marginTop:10, marginBottom:10}}
                selectedValue={this.state.valaszto}
                onValueChange={(ertek) => this.setState({valaszto:ertek}) 
              }>
                  {this.state.dataSource.map(item=>
                <Picker.Item label={item.tipus_nev} value={item.tipus_id} />
          )}
              </Picker>
      <Text style={{color:"green",fontSize:20,textAlign:"center",marginTop:10,marginLeft:100,marginRight:100,marginBottom:20}}>Kalória megadása:</Text>
      <TextInput
        style={{height:40,marginLeft:120,marginRight:120,marginBottom:10}}
        placeholder="Kalória"
        onChangeText={(beirtszoveg)=>this.setState({bevitel3:beirtszoveg})}
        value={this.state.bevitel3}
      />
      <Text style={{color:"green",fontSize:20,textAlign:"center",marginTop:10,marginLeft:100,marginRight:100,marginBottom:20}}>Fehérje megadása:</Text>
      <TextInput
        style={{height:40,marginLeft:120,marginRight:120,marginBottom:10}}
        placeholder="Fehérje"
        onChangeText={(beirtszoveg)=>this.setState({bevitel4:beirtszoveg})}
        value={this.state.bevitel4}
      />
      <Text style={{color:"green",fontSize:20,textAlign:"center",marginTop:10,marginLeft:100,marginRight:100,marginBottom:20}}>Kép megadása:</Text>
      <TextInput
        style={{height:40,marginLeft:120,marginRight:120,marginBottom:10}}
        placeholder="Kép"
        onChangeText={(beirtszoveg)=>this.setState({bevitel5:beirtszoveg})}
        value={this.state.bevitel5}
      />
          <TouchableOpacity
        style={styles.kekgomb}
        onPress={()=>this.felvitel()}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Feltöltés</Text>
      </TouchableOpacity>

      {/*------------------------------------------------------------------------Találatok*/}
      </ScrollView></SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    width:350,
    marginLeft:"auto",
    marginRight:"auto",
  }
});