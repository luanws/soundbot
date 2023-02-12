import { BackgroundColor } from "@bacons/expo-background-color"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import AppProvider from "./src/hooks"
import { useTheme } from "./src/hooks/theme"
import Routes from "./src/routes"
import { themes } from "./src/utils/theme/themes"

function Wrapper() {
  const theme = useTheme()

  return (
    <>
      <BackgroundColor color={theme.colors.background} />
      <Routes />
    </>
  )
}

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor={themes.light.colors.primaryDark}
        style='light'
      />
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <AppProvider>
            <Wrapper />
          </AppProvider>
        </SafeAreaView>
      </NavigationContainer>
    </>
  )
}