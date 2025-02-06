import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constant/Colors'
import Button from '../../components/Shared/Button';


export default function AddCourse() {
  const [loading,setLoading] = useState(false);

  const onGenerateTopic=()=>{
     
  }

  return (
    <View style={{
      padding:30,
      backgroundColor:Colors.WHITE,
      flex:1
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>
        Create New Course
      </Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:22
      }}>
        What you want to learn today?
      </Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:16,
        padding:8,
        color:Colors.GRAY
      }}>Write what course you want to create.. (Ex: Learn Python, React, Digitel Marketing, Crypto etc)</Text>
      <TextInput placeholder='Learn Python, Learn grade 11 Maths etc' 
      style={styles.TextInput}
      numberOfLines={3}
      multiline={true}/>

     <Button text={'Generate Topics'} type='outline' onPress={()=>onGenerateTopic()} loading={loading}/>


    </View>
  )


}

const styles = StyleSheet.create({

  TextInput:{
    padding:15,
    borderWidth:1,
    borderRadius:15,
    height:100,
    marginTop:10,
    alignItems:'flex-start'
  }
  

})