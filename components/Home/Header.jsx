import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import {UserDetailContext} from './../../context/UserDetailContext'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../app/constant/Colors';

export default function Header() {

    const {userDetail,setUserDetail}=useContext(UserDetailContext)

  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }}>
        <View>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25,
        color:Colors.PRYMARY
      }}>Hello..! {userDetail?.name}</Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:17
      }}>Let's Get Started,</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings" size={30} color="black" />
      </TouchableOpacity>
      
    </View>
  )
}