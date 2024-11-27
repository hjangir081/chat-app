import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'
import { User } from 'firebase/auth'

interface ChatList{
    users: any[],
    currentUser:User
}

const ChatList:React.FC<ChatList> = ({users, currentUser}) => {

    const router = useRouter(); 

  return (
    <View className='flex-1'>
      <FlatList 
      data={users}
      contentContainerStyle={{flex:1, paddingVertical:25}}
      keyExtractor={(item) => Math.random().toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => <ChatItem 
      router={router} 
      noBorder={index+1 == users.length} 
      item={item}
      currentUser={currentUser}
      />}
      />
    </View>
  )
}

export default ChatList