import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity,TextInput, } from 'react-native';
import Ipcim from './Ipcim';
const IP=require('./Ipcim')

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={
         isLoading: true,
         szo:"",
         dataSource:[]
        
        }
  }
  szavazat=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam,
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
    return fetch(IP.ipcim + 'etel')
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

keres=()=>{
   // alert("Hello")
    var bemenet={
      bevitel1:this.state.szo
    }

  fetch(IP.ipcim + 'keres', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.json())
  .then(y => {
  // alert(JSON.stringify(y));
  this.setState({ dataSource  : y })
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
          <Text style={{color:"green",fontSize:20,textAlign:"center",marginTop:50,marginLeft:100,marginRight:100,marginBottom:20}}>Add meg a keresett ételt!</Text>
          <TextInput
        style={{height:40,marginLeft:120,marginRight:120,marginBottom:20}}
        placeholder="Étel megadása:"
        onChangeText={(beirtszoveg)=>this.setState({szo:beirtszoveg})}
        value={this.state.szo}
      />
          <TouchableOpacity
        style={styles.kekgomb}
        onPress={()=>this.keres()}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Keresés</Text>
      </TouchableOpacity>


      {/*------------------------------------------------------------------------Találatok*/}
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          <Text style={{color:"green",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.etel_nev} </Text>
          <Text style={{color:"blue",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.etel_kcal} </Text>
          <Text style={{color:"grey",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.etel_prot} </Text>
          <Image  source={{uri: IP.ipcim+item.etel_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />       
          </View>
        }
          keyExtractor={({etel_id}, index) => etel_id}
        />
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