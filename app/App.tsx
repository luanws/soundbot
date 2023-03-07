import { BackgroundColor } from "@bacons/expo-background-color"
import { NavigationContainer } from "@react-navigation/native"
import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from "react"
import { SafeAreaView } from 'react-native'
import * as Migrations from "./src/database/migrations"
import { DatabaseUtils } from "./src/database/utils"
import AppProvider from "./src/hooks"
import { useAuth } from "./src/hooks/auth"
import { useSettings } from "./src/hooks/settings"
import { useTheme } from "./src/hooks/theme"
import Routes from "./src/routes"
import './src/utils/prototype/string'


async function runOnStartup() {
  await Migrations.runMigrations()
  await DatabaseUtils.showTables()
}

function Wrapper() {
  const theme = useTheme()
  const { authLoaded } = useAuth()
  const { isThemeLoading } = useSettings()

  const loaded = !isThemeLoading && authLoaded

  useEffect(() => {
    runOnStartup()
    NavigationBar.setBackgroundColorAsync(theme.colors.navigationBar.background)
    NavigationBar.setBorderColorAsync(theme.colors.navigationBar.border)
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <>
      <BackgroundColor color={theme.colors.background} />
      <StatusBar
        backgroundColor={theme.colors.statusBar.background}
        style={theme.colors.statusBar.icons}
      />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  )
}

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
  }, [])

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <AppProvider>
          <Wrapper />
        </AppProvider>
      </SafeAreaView>
    </>
  )
}