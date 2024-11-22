import { View, Text } from 'react-native'
import React from 'react'
import { DocumentData } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface Message{
    text: string;
    userId: string;
  }

interface MessageListProps{
    message: Message;
    currentUser: User;
}

const Messageitem:React.FC<MessageListProps> = ({message, currentUser}) => {
    if(currentUser?.uid == message?.userId){

    }
  return (
    <View className='flex-row justify-end mb-3 mr-3'>
      <View style={{width:  hp(80)}}>
        <View className='flex self-end p-3 rounded-2xl bg-white'>
        <Text>
            {message?.text}
        </Text>
        </View>
      </View>
    </View>
  )
}

export default Messageitem