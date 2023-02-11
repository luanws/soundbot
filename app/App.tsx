import { BackgroundColor } from "@bacons/expo-background-color"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import AppProvider from "./src/hooks"
import Routes from "./src/routes"
import { themes } from "./src/utils/theme/themes"

export default function App() {
  return (
    <>
      <BackgroundColor color={{ light: "#fff", dark: "#000" }} />
      <StatusBar
        backgroundColor={themes.light.colors.primaryDark}
        style='light'
      />
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <AppProvider>
            <Routes />
          </AppProvider>
        </SafeAreaView>
      </NavigationContainer>
    </>
  )
}