import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTheme } from '../hooks/theme'
import BibleVerseDisplaySettingsScreen from '../screens/BibleVerseDisplaySettingsScreen'
import MainRoutes from './main.routes'

export type AppStackParamList = {
  Main: undefined
  BibleVerseDisplaySettings: undefined
}

const App = createNativeStackNavigator<AppStackParamList>()

const AppRoutes: React.FC = () => {
  const theme = useTheme()

  return (
    <App.Navigator
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
      <App.Screen component={MainRoutes} name="Main" options={{ headerShown: false }} />
      <App.Screen component={BibleVerseDisplaySettingsScreen} name="BibleVerseDisplaySettings" />
    </App.Navigator>
  )
}

export default AppRoutes
