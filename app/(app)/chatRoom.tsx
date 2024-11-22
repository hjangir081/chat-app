import { View, Text, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '@/components/ChatRoomHeader';
import MessageList from '@/components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '@/components/customKeyboardView';
import { getRoomId } from '@/utils/common';
import { useAuth } from '@/context/authContext';
import { DocumentData, Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const ChatRoom = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [message, setMessage] = useState<DocumentData[]>([])
  const { user } = useAuth();
  const textRef = useRef('');
  const inputRef = useRef<TextInput>(null)
  console.log("Got Item Data::::::::::::::", item);

  // useEffect(() => {
  //   createRoomIfNotExists();
  //   const otherUserId = Array.isArray(item?.userId) ? item?.userId[0] : item?.userId;
  //   let roomId = getRoomId(user?.userId, otherUserId);
  //   const docRef = doc(db, "rooms", roomId);
  //   const messageRef = collection(docRef, "messages");
  //   const q = query(messageRef, orderBy('createdAt', 'asc'));
  
  //   let unsub = onSnapshot(q, (snapshot) => {
  //     let allMessages = snapshot.docs.map(doc => {
  //       return doc.data();
  //     });
  //     console.log("Fetched Messages:", allMessages);
  //     setMessage([...allMessages]);
  //   });
  
  //   return unsub();
  // }, []);
  

  useEffect(() => {
    createRoomIfNotExists();
    const otherUserId = Array.isArray(item?.userId) ? item?.userId[0] : item?.userId;
    let roomId = getRoomId(user?.userId, otherUserId);
    console.log("Generated Room ID:", roomId); // Log the generated room ID
  
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy('createdAt', 'asc'));
  
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => doc.data());
      console.log("Fetched Messages:", allMessages); // Log the fetched messages
      setMessage(allMessages);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });
  
    return unsub;
  }, []);
  


  const createRoomIfNotExists = async () => {
    const userId = user?.userId;
    const otherUserId = Array.isArray(item?.userId) ? item?.userId[0] : item?.userId;

    if (!userId || !otherUserId) {
      console.error("Invalid userId or otherUserId", { userId, otherUserId });
      return;
    }
    const roomId = getRoomId(userId, otherUserId);
    console.log("Generated Room ID:", roomId);
    try {
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
      });
      console.log("Room created successfully");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleSendMessage = async () => {
    const message = textRef.current.trim();
    if (!message) return;
    const otherUserId = Array.isArray(item?.userId) ? item?.userId[0] : item?.userId;

    if (!user?.userId || !otherUserId) {
      console.error("Invalid userId or otherUserId", { userId: user?.userId, otherUserId });
      return;
    }
    try {
      const roomId = getRoomId(user?.userId, otherUserId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef.current?.clear();

      await addDoc(messageRef, {
        userId: user.userId,
        text: message,
        profileUrl: user.profileUrl,
        senderName: user.userName,
        createdAt: Timestamp.fromDate(new Date()),
      });
      console.log("Message sent successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      Alert.alert("Message", errorMessage);
    }
  };


  return (
    <CustomKeyboardView inChat={true}>
      <View className='flex-1 bg-white'>
        <StatusBar barStyle={'dark-content'} />
        <ChatRoomHeader router={router} user={item} />
        <View className='h-3 border-b border-neutral-300' />
        <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
          <View className='flex-1'>
            <MessageList messages={message} currentUser={user} />
          </View>
          <View className='pt-2' style={{ marginBottom: hp(2.7) }}>
            <View className='flex-row justify-between items-center mx-3'>
              <View className='flex-row justify-between bg-white border p-2  border-neutral-300 rounded-full pl-5'>
                <TextInput
                  onChangeText={(value) => textRef.current = value}
                  placeholder='Type here...'
                  className='flex-1 mr-2'
                  style={{ fontSize: hp(2) }}
                  ref={inputRef}
                />
                <TouchableOpacity onPress={handleSendMessage} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                  <Feather name='send' size={hp(2.7)} color={'#737373'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}

export default ChatRoom