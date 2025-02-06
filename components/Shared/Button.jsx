import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '../../app/constant/Colors'

export default function Button({text,type='fill',onPress,loading}) {
  return (
    <TouchableOpacity onPress={onPress} style={{
        padding:15,
        width:'100%',
        borderRadius:20,
        marginTop:15,
        borderWidth:2,
        borderColor:Colors.PRYMARY,
        backgroundColor:type=='fill'?Colors.PRYMARY:Colors.WHITE,
        
    }}
      disabled={loading}
    >
     {!loading ?  <Text style={{
        textAlign:'center',
        fontSize:18,
        color:type=='fill'?Colors.WHITE:Colors.PRYMARY,
        fontFamily:'outfit-bold'

      }}>{text}</Text>:
      <ActivityIndicator size={'small'} color={type=='fill'?Colors.PRYMARY:Colors.WHITE}/>
      }
    </TouchableOpacity>
  )
}