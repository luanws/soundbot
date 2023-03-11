import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { useTheme } from '../hooks/theme'
import BibleScreen from '../screens/BibleScreen'
import HomeScreen from '../screens/HomeScreen'
import HymnbookScreen from '../screens/HymnbookScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SongsScreen from '../screens/SongsScreen'
import TasteAndSeeScreen from '../screens/TasteAndSeeScreen'
import { Theme } from '../theme/theme.model'
import DrawerIcon from './components/DrawerIcon'

export type MainDrawerParamList = {
  Home: undefined
  Bible: undefined
  Hymnbook: undefined
  Songs: undefined
  TasteAndSee: undefined
  Settings: undefined
}

const Drawer = createDrawerNavigator<MainDrawerParamList>()

const MainRoutes: React.FC = () => {
  const theme = useTheme() as Theme

  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTintColor: theme.colors.actionBar.text,
        headerStyle: {
          backgroundColor: theme.colors.actionBar.background,
        },
        sceneContainerStyle: {
          backgroundColor: theme.colors.background,
        },
        drawerContentStyle: {
          backgroundColor: theme.colors.containerBackground,
        },
        drawerLabelStyle: {
          color: theme.colors.navigationDrawer.content,
        },
        drawerItemStyle: {
          borderTopRightRadius: 1000,
          borderBottomRightRadius: 1000,
          marginLeft: -8,
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
      }}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Início',
          drawerIcon: (props) => (
            <DrawerIcon icon='MaterialIcons/home' {...props} />
          ),
        }}
      />

      <Drawer.Screen
        name='Bible'
        component={BibleScreen}
        options={{
          title: 'Bíblia',
          drawerIcon: (props) => (
            <DrawerIcon icon='FontAwesome5/bible' {...props} />
          ),
        }}
      />

      <Drawer.Screen
        name='Hymnbook'
        component={HymnbookScreen}
        options={{
          title: 'Hinário',
          drawerIcon: (props) => (
            <DrawerIcon icon='Ionicons/musical-notes' {...props} />
          ),
        }}
      />

      <Drawer.Screen
        name='Songs'
        component={SongsScreen}
        options={{
          title: 'Músicas',
          drawerIcon: (props) => (
            <DrawerIcon icon='Entypo/folder-music' {...props} />
          ),
        }}
      />

      <Drawer.Screen
        name='TasteAndSee'
        component={TasteAndSeeScreen}
        options={{
          title: 'Provai e vede',
          drawerIcon: (props) => (
            <DrawerIcon icon='MaterialIcons/visibility' {...props} />
          ),
        }}
      />

      <Drawer.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          title: 'Configurações',
          drawerIcon: (props) => (
            <DrawerIcon icon='MaterialIcons/settings' {...props} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default MainRoutes
