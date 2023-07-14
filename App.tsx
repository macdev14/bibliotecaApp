import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { AuthProvider, useAuth } from './src/context/auth';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (

     <AuthProvider>
    <NavigationContainer>
      <NativeBaseProvider>
      
          <Routes />
       
      </NativeBaseProvider>
    </NavigationContainer>
     </AuthProvider>
    
  );
}

