import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

type emptyProps = {
    size:number
}

const Empty:React.FC<emptyProps> = ({size}) => {
  return (
    <View style={{height:size, aspectRatio: 1}}>
     <LottieView style={{flex:1}} source={require('../assets/animations/empty.json')} autoPlay loop/>
    </View>
  )
}

export default Empty