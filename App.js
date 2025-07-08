import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritosProvider } from './context/FavoritosContext';

import Home from './screens/Home';
import PagPericias from './screens/PagPericias';
import PagVantagens from './screens/PagVantagens';
import PagDesvantagens from './screens/PagDesvantagens';
import PagArquetipos from './screens/PagArquetipos';
import PagFavoritos from './screens/PagFavoritos';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Header from './components/Header'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="MainApp" component={MainAppRoutes} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainAppRoutes() {
  const Stack = createNativeStackNavigator();

  return (
    <FavoritosProvider>
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pericias" component={PagPericias} />
        <Stack.Screen name="Vantagens" component={PagVantagens} />
        <Stack.Screen name="Desvantagens" component={PagDesvantagens} />
        <Stack.Screen name="Arquetipos" component={PagArquetipos} />
        <Stack.Screen name="Favoritos" component={PagFavoritos} />
      </Stack.Navigator>
    </FavoritosProvider>
  );
}


