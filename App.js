import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import IconButton from './components/ui/IconButton';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState, useRef } from 'react';
import { Colors } from './constants/style';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingToLogin, setIsTryToLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  const isAppReady = useRef(false); // useRef to manage app readiness state

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      isAppReady.current = true;
      setIsTryToLogin(false);
    }

    fetchToken();
  }, []);

  useEffect(() => {
    // Hide the splash screen once the app is ready
    if (!isTryingToLogin && isAppReady.current) {
      SplashScreen.hideAsync();
    }
  }, [isTryingToLogin]);

  // There's no need to return anything related to AppLoading/SplashScreen here
  // The SplashScreen is controlled directly via the useEffect hooks
  if (isTryingToLogin) {
    return null; // While waiting for auth, just return null, SplashScreen will remain visible
  }

  return <Navigation />;
}

export default function App() {
  // Ensure SplashScreen.preventAutoHideAsync() is called immediately
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}