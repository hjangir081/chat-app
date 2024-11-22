import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments } from "expo-router";
import '../global.css'
import AuthContextProvider, { AuthContext, useAuth } from '@/context/authContext';
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout = () => {
  const { authenticated } = useAuth();  // Using the context here
  const segment = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof authenticated == 'undefined') return;
    const inApp = segment[0] == '(app)';
    if (authenticated && !inApp) {
      router.replace('/home');
    } else if (authenticated == false) {
      router.replace('/signIn');
    }
  }, [authenticated]);

  return <Slot />;
};


const RootLayout = () => {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  )
}
export default RootLayout;