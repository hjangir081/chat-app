import { View, Text } from 'react-native'
import React from 'react'
import { User } from 'firebase/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { DocumentData } from 'firebase/firestore';

interface MessageListProps {
    message: DocumentData;
    currentUser: User;
}

const MessageItem: React.FC<MessageListProps> = ({ message, currentUser }) => {
    if (currentUser?.uid === message?.userId) {
      return (
        <View className="flex-row justify-end mb-3 mr-3">
          <View style={{ width: hp(80) }}>
            <View className="flex self-end p-3 rounded-2xl bg-white border border-neutral-300">
              <Text style={{fontSize: hp(1.9)}}>{message?.text}</Text>
            </View>
          </View>
        </View>
      );
    } else {
        return (
          <View style={{ width: wp(80) }} className='ml-3 mb-3'>
            <View className='flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200'>
              <Text style={{ fontSize: hp(1.9) }}>
                {message?.text}
              </Text>
            </View>
          </View>
        );
    }
};

export default MessageItem;
