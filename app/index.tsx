import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '@/components/loading'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Index = () => {
    return (
        <SafeAreaView className='flex-1 justify-center items-center'>
            <Loading size={hp(15)} />
        </SafeAreaView>
    )
}

export default Index