import { View, Text, Pressable, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatList from '@/components/ChatList';
import Empty from '@/components/Empty';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {  doc, getDocs, query, where } from 'firebase/firestore';
import { userRef } from '@/firebaseConfig';

interface UserData {
  userId: string;
  userName: string;
  profileUrl: string;
}

const Home = () => {  
  const { logout, user } = useAuth();
  const [ users, setUsers ] = useState<UserData[]>([]);
  useEffect(() => {
    if(user?.uid){
      getUsers();
    }
  },[])
  const getUsers = async() => {
    const firebaseQuery = query(userRef, where("userId", "!=", user?.uid));
    const querySnapshot = await getDocs(firebaseQuery);
    let data:UserData[] = [];
    querySnapshot.forEach(doc=>{
      data.push({...doc.data()} as UserData)
    });
    setUsers(data);
    console.log(data)
  }
  console.log("User Data: ", user)
  
  return (
    <View className='flex-1'>
      <StatusBar barStyle={'light-content'}/>
      {
        users.length>0?(
          <ChatList users={users}/>
        ):
        (
          <View className='top-20 justify-center items-center'>
            <Empty size={hp(30)}/>
          </View>
        )
      }
    </View>
  )
}

export default Home