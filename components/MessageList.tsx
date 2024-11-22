import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Messageitem from './Messageitem';
import { DocumentData } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface Message{
    text: string;
    userId: string;
  }

interface MessageListProps{
    messages: Message[];
    currentUser: User;
}

const MessageList:React.FC<MessageListProps> = ({messages, currentUser}) => {
  return (
    <ScrollView showsVerticalScrollIndicator = {false} contentContainerStyle = {{paddingTop:10}}>
      {
        messages.map((message, index)=>{
            return(
                <Messageitem message = {message} key={index} currentUser={currentUser}/>
            )
        })
      }
    </ScrollView>
  )
}

export default MessageList