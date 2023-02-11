import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTheme } from '../hooks/theme'
import MainRoutes from './main.routes'

export type AppStackParamList = {
  Main: undefined
}

const App = createNativeStackNavigator<AppStackParamList>()

const AppRoutes: React.FC = () => {
  const theme = useTheme()

  return (
    <App.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        animation: 'fade_from_bottom'
      }}
    >
      <App.Screen component={MainRoutes} name="Main" options={{ headerShown: false }} />
    </App.Navigator>
  )
}

export default AppRoutes
