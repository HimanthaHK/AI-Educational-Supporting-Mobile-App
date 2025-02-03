import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from './constant/Colors'
import { useRouter } from "expo-router";
import {onAuthStateChanged} from 'firebase/auth';
import {auth, db} from './../config/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

export default function Index() {

  const router=useRouter();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);

  onAuthStateChanged(auth,async(user)=>{
    if(user){
      console.log(user);
      const result=await getDoc(doc(db,'users',user?.email));
      setUserDetails(result.data())
      router.replace('/(tabs)/home')
    }
  })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:Colors.WHITE
      }}
    >
      <Image source={require('../assets/images/loglo.png')}
      style={{
        width:'100%',
        height:300,
        marginTop:70
      }}/>
      <View style={{
        padding:25,
        backgroundColor:Colors.PRYMARY,
        height: '100%',
        borderRadius:35
      }}>
        <Text style={{
          fontSize:30,
          fontFamily:'outfit-bold',
          textAlign:'center',
          color: Colors.WHITE
        }}>Welcome To Edu-Idea </Text>
        <Text style={{
          fontSize:20,
          color:Colors.WHITE,
          marginTop:20,
          textAlign:'center',
          fontFamily:'outfit'

        }}>
          Transform Your Ideas Into Engaing Educational Contents With AI!
        </Text>
        <TouchableOpacity style={styles.button}
          onPress={()=> router.push('/auth/signUp')}>
          <Text style={[styles.buttonText,{color:Colors.PRYMARY}]}>Get Startded</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> router.push('/auth/signIn')} style={[styles.button,
          {
            backgroundColor:Colors.PRYMARY,
            borderWidth:2,
            borderColor:Colors.WHITE
          }
        ]}>
          <Text style={[styles.buttonText,{color:Colors.WHITE}]}>Already Have An Account?</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  button:{
    padding:15,
    backgroundColor:Colors.WHITE,
    marginTop: 15,
    borderRadius:20 
  },
  buttonText:{
    textAlign:'center',
    fontSize:18 ,
    fontFamily:'outfit-bold'
  }

})
