import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '../constant/Colors';
import Button from '../../components/Shared/Button';
import { GenerateCourseAIModel, GenerateTopicsAIModel } from '../../config/AiModel';
import { db } from '../../config/firebaseConfig';
import Prompt from '../constant/Prompt';
import { UserDetailContext } from '../../context/UserDetailContext';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const userDetail = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const router = useRouter();

  const onGenerateTopic = async () => {
    setLoading(true);
    const PROMPT = userInput + Prompt.IDEA;
    try {
      const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
      const topicIdea = JSON.parse(aiResp.response.text());

      console.log("AI Topic Response:", topicIdea);
      setTopics(topicIdea.course_titles || []);
    } catch (error) {
      console.error("Error parsing AI response:", error);
    }
    setLoading(false);
  };

  const onTopicSelected = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(item => item !== topic) : [...prev, topic]
    );
  };

  const isTopicSelected = (topic) => selectedTopics.includes(topic);

  const onGenerateCourse = async () => {
    setLoading(true);
    const PROMPT = selectedTopics.join(', ') + Prompt.COURSE;
  
    try {
      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
      const responseText = await aiResp.response.text();
  
      console.log("AI Course Response:", responseText);
  
      const resp = JSON.parse(responseText);
      const courses = resp.courses;
  
      if (!courses || !Array.isArray(courses)) {
        throw new Error("Invalid course data received");
      }
  
      console.log("Parsed Courses:", courses);
  
      // Save courses to Firestore
      for (const course of courses) {
        if (!course || typeof course !== "object") {
          console.error("Invalid course format:", course);
          continue;
        }
  
        const courseTitle = course.courseTitle || "Untitled Course"; //  Fix key name
        const courseData = {
          ...course,
          title: courseTitle,  // Assign title correctly
          createdOn: new Date(),
          createdBy: userDetail?.email || "unknown",
        };
  
        try {
          await setDoc(doc(db, "Courses", Date.now().toString()), courseData);
          console.log("Course saved to Firestore:", courseTitle);
        } catch (dbError) {
          console.error("Error saving course to Firestore:", dbError);
        }
      }
  
      router.push('/(tabs)/home');
    } catch (error) {
      console.error("Error in onGenerateCourse:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.header}>Create New Course</Text>
        <Text style={styles.subHeader}>What do you want to learn today?</Text>
        <Text style={styles.description}>
          Write what course you want to create.
        </Text>
        <TextInput
          placeholder='Learn Python, Learn grade 11 Maths, etc.'
          style={styles.TextInput}
          numberOfLines={3}
          multiline={true}
          onChangeText={setUserInput}
        />
        
        <Button text={'Generate Topics'} type='outline' onPress={onGenerateTopic} loading={loading} />

        <View style={styles.topicContainer}>
          <Text style={styles.topicHeader}>Select topics to add to the course</Text>
          <View style={styles.topicList}>
            {topics.map((item, index) => (
              <Pressable key={index} onPress={() => onTopicSelected(item)}>
                <Text style={[
                  styles.topicText,
                  isTopicSelected(item) && styles.selectedTopic
                ]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {selectedTopics.length > 0 && (
          <Button text='Generate Course' onPress={onGenerateCourse} loading={loading} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: Colors.WHITE,
    flex: 1
  },
  header: {
    fontFamily: 'outfit-bold',
    fontSize: 30
  },
  subHeader: {
    fontFamily: 'outfit',
    fontSize: 22
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 16,
    padding: 8,
    color: Colors.GRAY
  },
  TextInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 80,
    marginTop: 5,
    alignItems: 'flex-start'
  },
  topicContainer: {
    marginTop: 15
  },
  topicHeader: {
    fontSize: 15,
    fontFamily: 'outfit'
  },
  topicList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 5
  },
  topicText: {
    padding: 5,
    borderWidth: 0.4,
    borderRadius: 99,
    paddingHorizontal: 15,
    color: Colors.PRYMARY
  },
  selectedTopic: {
    backgroundColor: Colors.PRYMARY,
    color: Colors.WHITE
  }
});
