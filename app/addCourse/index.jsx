import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, Pressable } from 'react-native';
import React, { useState } from 'react';
import Colors from '../constant/Colors';
import Button from '../../components/Shared/Button';
import { GenerateCourseAIModel, GenerateTopicsAIModel } from '../../config/AiModel';
import Prompt from '../constant/Prompt';

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopics,setSelectedTopics] = useState([]);

  const onGenerateTopic = async () => {
    setLoading(true);
    const PROMPT = userInput + Prompt.IDEA;
    const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
    
    try {
      const topicIdea = JSON.parse(aiResp.response.text());
      console.log(topicIdea);
      setTopics(topicIdea.course_titles);
    } catch (error) {
      console.error("Error parsing AI response:", error);
    }

    setLoading(false);
  }
  const onTopicSelected=(topics)=>{
    const isAlreadyExist=selectedTopics.find((item)=>item==topics)
    if(!isAlreadyExist)
    {
      setSelectedTopics(prev => [...prev, topics]);

    }
    else{
      const topicss=selectedTopics.filter(item=>item!==topics);
      setSelectedTopics(topicss);
    }
  }
  const isTopicSelected=(topics)=>{
    const selection = selectedTopics.find(item=>item==topics);
    return selection?true:false
  }
  const onGenerateCourse=async()=>{
    setLoading(true);
    const PROMPT = selectedTopics+Prompt.COURSE;
    const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
    const course = JSON.parse(aiResp.response.text());
    console.log(course);
    setLoading(false);

  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.header}>Create New Course</Text>
        <Text style={styles.subHeader}>What you want to learn today?</Text>
        <Text style={styles.description}>
          Write what course you want to create.. 
        </Text>
        <TextInput
          placeholder='Learn Python, Learn grade 11 Maths etc'
          style={styles.TextInput}
          numberOfLines={3}
          multiline={true}
          onChangeText={setUserInput}
        />
        
        <Button text={'Generate Topics'} type='outline' onPress={onGenerateTopic} loading={loading} />

        <View style={styles.topicContainer}>
          <Text style={styles.topicHeader}>Select topics which you want to add to course</Text>
          <View style={{
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            gap:7,
            marginTop:5
          }}>
            {topics.map((item, index) => (
              <Pressable key={index} onPress={()=>onTopicSelected(item)}>
              <Text style={{
                padding:5,
                borderWidth:0.4,
                borderRadius:99,
                paddingHorizontal:15,
                backgroundColor:isTopicSelected(item)? Colors.PRYMARY:null,
                color: isTopicSelected(item)?Colors.WHITE:Colors.PRYMARY

              }}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
            {selectedTopics?.length > 0 && <Button text='Generate Course'
            onPress={()=>onGenerateCourse()}
            loading={loading}/>
          }


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
  }
});
