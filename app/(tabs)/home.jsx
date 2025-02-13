import { View, Text, Platform } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Home/Header';
import Colors from '../constant/Colors';
import NoCourse from '../../components/Home/NoCourse';
import { db } from '../../config/firebaseConfig';
import { UserDetailContext } from '../../context/UserDetailContext';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { CourseList } from '../../components/Home/CourseList';  // Ensure CourseList is imported correctly
import { useRouter } from 'expo-router'; // Importing the useRouter hook for navigation

export default function Home() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    if (userDetail) {
      GetCourseList(); // Call function to fetch courses if userDetail is available
    }
  }, [userDetail]);

  const GetCourseList = async () => {
    const q = query(collection(db, 'Courses'), where('createdBy', '==', userDetail?.email));
    const querySnapshot = await getDocs(q);

    const courses = [];
    querySnapshot.forEach((doc) => {
      console.log('chatgpt', doc.data());
      courses.push(doc.data());
    });

    setCourseList(courses);  // Update the courseList state with fetched courses
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: Platform.OS === 'ios' ? 45 : 0,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Header />

      {courseList?.length === 0 ? (
        <NoCourse />
      ) : (
        <CourseList courses={courseList} /> // Pass the courses to the CourseList component
      )}
    </View>
  );
}
