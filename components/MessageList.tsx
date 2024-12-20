import { View, Text, ScrollView } from 'react-native'
import React, { MutableRefObject } from 'react'
import { DocumentData } from 'firebase/firestore';
import { User } from 'firebase/auth';
import MessageItem from './Messageitem';

interface MessageListProps{
    messages: DocumentData[] ;
    currentUser: User;
    scrollViewRef:React.RefObject<ScrollView>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser, scrollViewRef }) => {
    return (
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}>
        {messages.map((message, index) => (
          <MessageItem message={message} key={index} currentUser={currentUser} />
        ))}
      </ScrollView>
    );
  };
  

export default MessageList