import '../global.css';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, Slot, Redirect } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { GluestackUIProvider as NativewindProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthProvider } from '../utils/AuthContext';
import ProtectedRoute from '../utils/ProtectedRoute';
import { SessionProvider } from '../ctx';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  
  return (
    <SessionProvider>
    <NativewindProvider mode={colorScheme}>
    <Slot />
    </NativewindProvider>
    </SessionProvider>
  );
}
