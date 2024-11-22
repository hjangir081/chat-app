import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'

interface ChatList{
    users: any[],
}

const ChatList:React.FC<ChatList> = ({users}) => {

    const router = useRouter(); 

  return (
    <View className='flex-1'>
      <FlatList 
      data={users}
      contentContainerStyle={{flex:1, paddingVertical:25}}
      keyExtractor={(item) => Math.random().toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => <ChatItem router={router} noBorder={index+1 == users.length} item={item}/>}
      />
    </View>
  )
}

export default ChatList