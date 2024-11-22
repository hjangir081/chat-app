import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import Loading from '@/components/loading'
import CustomKeyboardView from '@/components/customKeyboardView'
import { useAuth } from '@/context/authContext'

const SignIn: React.FC = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const emailRef = useRef(""); //useState will rerender the whole page every time that's why using useRef
    const passwordRef = useRef(""); //useState will rerender the whole page every time that's why using useRef
    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Sign In", "Please fill the fields to proceed!")
            return;
        }
        setLoading(true);
        const response = await login(emailRef.current, passwordRef.current);
        setLoading(false);
        if(!response.success){
            Alert.alert("Sign In", response.msg); 
        }
    }
    return (
        <CustomKeyboardView>
            <SafeAreaView>
            <StatusBar barStyle={'dark-content'} />
            <View className='gap-12' style={{ paddingHorizontal: hp(4) }}>
                <View className='items-center'>
                    <Image style={{ height: hp(27) }} resizeMode='contain' source={require('../assets/images/Login.png')} />
                </View>
                <View className='gap-10'>
                    <Text style={{ fontSize: hp(4) }} className='font-bold tracking-wider text-center'>Sign In</Text>
                    <View style={{ height: hp(5) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounder-xl'>
                        <Octicons name='mail' size={hp(2.7)} color={'grey'} />
                        <TextInput
                            onChangeText={value => emailRef.current = value}
                            style={{ fontSize: hp(2) }}
                            className='flex-1 font-semibold text-neutral-700'
                            placeholder='Email Address'
                            placeholderTextColor={'gray'}
                        />
                    </View>
                    <View className='gap-3'>
                        <View style={{ height: hp(5) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounder-xl'>
                            <Octicons name='lock' size={hp(2.7)} color={'grey'} />
                            <TextInput
                                onChangeText={value => passwordRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className='flex-1 font-semibold text-neutral-700'
                                placeholder='Password'
                                placeholderTextColor={'gray'}
                                secureTextEntry
                            />
                        </View>
                        <Text
                            style={{ fontSize: hp(1.8) }}
                            className='font-semibold text-right text-neutral-500'>
                            Forgot Password?
                        </Text>
                    </View>

                    <View>
                        {
                            loading ? (
                                <View className='flex-row justify-center'>
                                    <Loading size={hp(10)} />
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => handleLogin()}
                                    style={{ height: hp(6.5) }}
                                    className='bg-indigo-500 rounded-xl justify-center items-center'>
                                    <Text style={{ fontSize: hp(2.7) }}
                                        className='text-white font-bold tracking-wider'>
                                        Sign In
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>


                    <View className='flex-row justify-center'>
                        <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>Don't have an account? </Text>
                        <Pressable onPress={() => router.push('/signUp')}>
                            <Text style={{ fontSize: hp(1.8) }} className='font-bold text-neutral-500 text-indigo-500'>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
        </CustomKeyboardView>
    )
}

export default SignIn