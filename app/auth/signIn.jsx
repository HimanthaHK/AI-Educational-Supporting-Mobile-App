import { View, Text, Image, TouchableOpacity, TextInput, Pressable, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Colors from './../constant/Colors'
import { router, useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

export default function SignIn() {

   const router=useRouter();
   const [email,setEmail] = useState();
   const [password,setPassword] = useState();

   const onSignClick=()=>{
        signInWithEmailAndPassword(auth,email,password)
        .then(resp=>{
          const user=resp.user;
          console.log(user);
        }).catch(e=>{
          console.log(e)
          ToastAndroid.show('Incorrect Email & Passwors',ToastAndroid.BOTTOM)
        })
   }

  return (
    <View style={{
        display:'flex',
        flex:1,
        paddingTop:100,
        alignItems:'center',
        backgroundColor:Colors.WHITE,
        padding:30
    }}>
      <Image source={require('./../../assets/images/learning.gif')}
      style={{
        width:180,
        height:180
      }}/>
      <Text style={{
        fontSize:25,
        fontFamily:'outfit-bold',
        color:Colors.SECONDARY
      }}>
        Welcome Back!
      </Text>

      <TextInput placeholder='Email'
      onChangeText={(value)=>setEmail(value)}
      style={styles.textInput}/>
      <TextInput placeholder='Password' 
      onChangeText={(value)=>setPassword(value)}
      secureTextEntry={true} style={styles.textInput}/>

      <TouchableOpacity 
        onPress={onSignClick}
      style={{
        padding:15,
        width:'80%',
        backgroundColor:Colors.PRYMARY,
        marginTop:25,
        borderRadius:35
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            color:Colors.WHITE,
            textAlign:'center',
            fontSize:18
        }}>Sign In</Text>
      </TouchableOpacity>
      <View style={{
        display:'flex',
        flexDirection:'row', gap:5,
        marginTop:10
      }}>
        <Text style={{fontFamily:'outfit'}}>Don't have an Account?</Text>
        <Pressable onPress={()=> router.push('auth/signUp')}>
            <Text style={{color:Colors.PRYMARY,fontFamily:'outfit-bold'}}>Sign Up here</Text>
        </Pressable>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    textInput:{
        borderWidth:2,
        width:'100%',
        padding:12,
        fontSize:18,
        marginTop:20,
        borderRadius:15

    
    }
})