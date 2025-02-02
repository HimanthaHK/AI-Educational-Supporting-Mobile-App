import { View, Text, Image, TouchableOpacity, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from './../constant/Colors'
import { useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignIn() {

   const router = useRouter();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const { setUserDetails } = useContext(UserDetailContext);

   const showError = (message) => {
      if (Platform.OS === 'android') {
         ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
         Alert.alert("Error", message);
      }
   };

   const onSignClick = () => {
      if (!email || !password) {
         showError("Please enter email and password");
         return;
      }

      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
         .then(async (resp) => {
            const user = resp.user;
            console.log(user);
            await getUserDetails();
            setLoading(false);
            router.replace('/(tabs)/home');
         })
         .catch(e => {
            console.log(e);
            setLoading(false);
            showError("Incorrect Email & Password");
         });
   };

   const getUserDetails = async () => {
      try {
         const userDoc = await getDoc(doc(db, 'users', email));
         if (userDoc.exists()) {
            console.log(userDoc.data());
            setUserDetails(userDoc.data());
         } else {
            console.log("User not found in Firestore.");
         }
      } catch (error) {
         console.log("Error fetching user details:", error);
      }
   };

   return (
      <View style={styles.container}>
         <Image source={require('./../../assets/images/learning.gif')}
            style={styles.image} />
         <Text style={styles.welcomeText}>Welcome Back!</Text>

         <TextInput placeholder='Email'
            onChangeText={setEmail}
            value={email}
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none" />
         <TextInput placeholder='Password'
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            style={styles.textInput} />

         <TouchableOpacity
            onPress={onSignClick}
            disabled={loading}
            style={styles.signInButton}>
            {!loading ? <Text style={styles.signInText}>Sign In</Text> :
               <ActivityIndicator size={'large'} color={Colors.SECONDARY} />
            }
         </TouchableOpacity>
         <View style={styles.signUpContainer}>
            <Text style={styles.normalText}>Don't have an Account?</Text>
            <Pressable onPress={() => router.push('auth/signUp')}>
               <Text style={styles.signUpText}>Sign Up here</Text>
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 100,
      alignItems: 'center',
      backgroundColor: Colors.WHITE,
      padding: 30
   },
   image: {
      width: 180,
      height: 180
   },
   welcomeText: {
      fontSize: 25,
      fontFamily: 'outfit-bold',
      color: Colors.SECONDARY
   },
   textInput: {
      borderWidth: 2,
      width: '100%',
      padding: 12,
      fontSize: 18,
      marginTop: 20,
      borderRadius: 15
   },
   signInButton: {
      padding: 15,
      width: '80%',
      backgroundColor: Colors.PRYMARY,
      marginTop: 25,
      borderRadius: 35
   },
   signInText: {
      fontFamily: 'outfit-bold',
      color: Colors.WHITE,
      textAlign: 'center',
      fontSize: 18
   },
   signUpContainer: {
      flexDirection: 'row',
      gap: 5,
      marginTop: 10
   },
   normalText: {
      fontFamily: 'outfit'
   },
   signUpText: {
      color: Colors.PRYMARY,
      fontFamily: 'outfit-bold'
   }
});
