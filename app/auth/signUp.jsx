import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from './../constant/Colors'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignUp() {

    const router=useRouter();
    const [fullName,setFullName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const {userDetail,setUserDetail} = useContext(UserDetailContext)

    const CreateNewAccount=()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(async(resp)=>{
            const user = resp.user;
            console.log(user);
            await SaveUser(user);

        })
        .catch(e=>{
            console.log(e.message)
        })
    }
    const SaveUser=async(user)=>{
      const data = {
        name:fullName,
        email:email,
        member:false,
        uid:user?.uid
    }
        await setDoc(doc(db,'users',email),data)
        setUserDetail(data);
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
        Create New Account 
      </Text>

      <TextInput placeholder='Full Name' onChangeText={(value)=>setFullName(value)} style={styles.textInput}/>
      <TextInput placeholder='Email' onChangeText={(value)=>setEmail(value)} style={styles.textInput}/>
      <TextInput placeholder='Password' onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.textInput}/>

      <TouchableOpacity 
      onPress={CreateNewAccount}
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
        }}>Create Account</Text>
      </TouchableOpacity>
      <View style={{
        display:'flex',
        flexDirection:'row', gap:5,
        marginTop:10
      }}>
        <Text style={{fontFamily:'outfit'}}>Already have an Account?</Text>
        <Pressable onPress={()=> router.push('auth/signIn')}>
            <Text style={{color:Colors.PRYMARY,fontFamily:'outfit-bold'}}>Sign in here</Text>
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