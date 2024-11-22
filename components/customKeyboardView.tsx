import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

interface customKeyboardAvoidingViewProps {
    children: React.ReactNode;
    inChat:boolean
}

const ios = Platform.OS == 'ios';

const CustomKeyboardView: React.FC<customKeyboardAvoidingViewProps> = ({ children, inChat }) => {
    let keyConfig = {};
    let scrollViewConfig = {};
    if(inChat){
        keyConfig = {keyboardVerticalOffset:90};
        scrollViewConfig = { contentContainerStyle:{flex:1} }
    }
    return (
            <KeyboardAvoidingView
                behavior={ios ? 'padding' : 'height'}
                style={{ flex: 1 }}
                { ...keyConfig }
            >
                <ScrollView
                    style={{ flex: 1 }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    { ...scrollViewConfig }
                >
                    {
                        children
                    }
                </ScrollView>
            </KeyboardAvoidingView>
      
    )
}

export default CustomKeyboardView