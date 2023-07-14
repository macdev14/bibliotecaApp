import React from 'react';
// import AppRoutes from './app.routes';

import {ActivityIndicator, View} from 'react-native';
import { useAuth } from '../context/auth';
import AppRoutes from './app/index.routes';
import AuthRoutes from './auth/index.routes';

const Routes = () => {
  const {signed, loading, user} = useAuth();
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
