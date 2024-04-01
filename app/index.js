import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { router } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback } from "react";


export default function Index() {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('login');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const iniciar = async () => {
    const info = await getData()

    if (info == null) {
      router.replace("login/")
    } else if (info == "admin") {
      router.replace("admin/")
    } else if (info == "aluno") {
      router.replace("inicio/")
    }
  }
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded, fontError] = useFonts({
    'Poppins': require('../fonts/Poppins-Light.ttf'),
    'Poppins-Bold': require('../fonts/Poppins-Bold.ttf'),
    'Poppins-Extra-Bold': require('../fonts/Poppins-ExtraBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();

    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  } else {
    iniciar()
  }








}