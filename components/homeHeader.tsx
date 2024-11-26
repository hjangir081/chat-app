import { View, Text, Platform } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurhash } from '@/utils/common';
import { useAuth } from '@/context/authContext';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import MenuItems from './CustomMenuItems';
import { Feather } from '@expo/vector-icons';

const HomeHeader = () => {
    const { logout, user } = useAuth();
    console.log("User Data: ", user)
    const handleLogout = async () => {
        await logout();
    }
    const handleProfile = () => { }
    const Divider = () => {
        return(
            <View className='p-(1px) w-full bg-neutral-200'/>
        )
    }
    return (
        <SafeAreaView className={` ${ Platform.OS == 'android' ? "py-6" : null } flex-row justify-between px-5 bg-indigo-400 rounded-b-3xl shadow`}>
            <View>
                <Text style={{ fontSize: hp(3) }} className='font-medium text-white'>Chats</Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {

                        }
                    }}>
                        <Image
                            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                            source={{uri:user?.profileUrl}}
                            placeholder={{ uri:'https://cdn-icons-png.flaticon.com/128/847/847969.png' }}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions customStyles={{
                        optionsContainer:{
                            borderRadius:10,
                            borderCurve:'continuous',
                            marginTop:38,
                            marginLeft:-10,
                            shadowOpacity:0.2,
                            shadowOffset:{width:0, height:0},
                            width:160
                        }
                    }}>
                        <MenuItems
                            text='Profile'
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color={'#737373'} />}
                        />
                        <Divider/>
                        <MenuItems
                            text='Sign Out'
                            action={handleLogout}
                            value={null}
                            icon={<Feather name='log-out' size={hp(2.5)} color={'#737373'} />}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </SafeAreaView>
    )
}

export default HomeHeader