import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native';
import IP from "./Ipcim"

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  szavazat=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
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
        
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          <Text style={{color:"green",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.etel_nev} </Text>
          <Text style={{color:"blue",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.etel_kcal} </Text>
          <Text style={{color:"grey",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.etel_prot} </Text>
          <Image  source={{uri: IP.ipcim +item.etel_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />       
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
    backgroundColor: "yellow",
    padding: 10,
    width:350,
    marginLeft:"auto",
    marginRight:"auto",
  }
});