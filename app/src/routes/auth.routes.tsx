import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTheme } from '../hooks/theme'
import AuthScreen from '../screens/AuthScreen'

export type AuthStackParamList = {
  Auth: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthRoutes: React.FC = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.actionBar.text,
        headerStyle: {
          backgroundColor: theme.colors.actionBar.background,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        animation: 'fade_from_bottom'
      }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Autenticação' }} />
    </Stack.Navigator>
  )
}

export default AuthRoutes
