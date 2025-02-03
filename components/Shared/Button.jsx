import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../app/constant/Colors'

export default function Button({text,type='fill',onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={{
        padding:15,
        width:'90%',
        borderRadius:20,
        marginTop:15,
        borderWidth:2,
        borderColor:Colors.PRYMARY,
        backgroundColor:type=='fill'?Colors.PRYMARY:Colors.WHITE
    }}>
      <Text style={{
        textAlign:'center',
        fontSize:18,
        color:type=='fill'?Colors.WHITE:Colors.PRYMARY,
        fontFamily:'outfit-bold'

      }}>{text}</Text>
    </TouchableOpacity>
  )
}