import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Router } from 'expo-router';
import { Image } from 'expo-image';
import { blurhash, formatDate, getRoomId } from '@/utils/common';
import { DocumentData, collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { User } from 'firebase/auth';

interface ChatItemProps {
    item: any;
    router?: Router;
    noBorder?: boolean;
    currentUser:User
}

const ChatItem: React.FC<ChatItemProps> = ({ item, router, noBorder, currentUser }) => {

    const openChatRoom = () => {
        router?.push({pathname:'/chatRoom', params:item});
    }

    const [ lastMessage, setLastMessage ] = useState<DocumentData | null | undefined>(undefined);

    useEffect(() => {   
        const otherUserId = Array.isArray(item?.userId) ? item?.userId[0] : item?.userId;
        let roomId = getRoomId(currentUser?.uid, otherUserId);
        console.log("Generated Room ID:", roomId); // Log the generated room ID
      
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'desc'));
      
        let unsub = onSnapshot(q, (snapshot) => {
          let allMessages = snapshot.docs.map(doc => doc.data());
          console.log("Fetched Messages:", allMessages); // Log the fetched messages
          setLastMessage(allMessages[0] ? allMessages[0] : null)
        }, (error) => {
          console.error("Error fetching messages:", error);
        });
      
        return unsub;
      }, []);

      console.log('Last Message ======', lastMessage)

      const renderTime = () => {
        if(lastMessage){
            let date = lastMessage?.createdAt;
            return formatDate(new Date(date?.seconds * 1000));
            //console.log('Last message time: ',lastMessage.createdAt)
        }
        return '3:00'
      }

      const renderLastMessage = () => {
        if(typeof lastMessage == undefined ) return 'Loading...'
        if(lastMessage){
            if(currentUser?.uid == lastMessage?.userId)return "You: "+lastMessage?.text;
            return lastMessage?.text;
        }else{
            return 'Say hi!👋'
        }
        
      }

    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-b-neutral-300'}`}>
            <Image
                source={{ uri: item.profileUrl }}
                style={{ height: hp(6), width: hp(6), borderRadius:100 }}
                placeholder={blurhash}
                transition={500}
            />
            <View className='flex-1 gap-1'>
                <View className='flex-row justify-between'>
                    <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-800'>{item.userName}</Text>
                    <Text style={{ fontSize: hp(1.6) }} className='font-medium text-neutral-500'>{renderTime()}</Text>
                </View>
                <Text style={{ fontSize: hp(1.6) }} className='font-medium text-neutral-500'>{renderLastMessage()}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem