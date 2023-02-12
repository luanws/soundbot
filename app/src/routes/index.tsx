import * as NavigationBar from 'expo-navigation-bar'
import React, { useEffect } from 'react'
import { useAuth } from '../hooks/auth'
import { useSettings } from '../hooks/settings'
import { useTheme } from '../hooks/theme'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

const Routes: React.FC = () => {
  const { authLoaded, authenticated } = useAuth()
  const { colors } = useTheme()
  const { isThemeLoading } = useSettings()

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.navigationBar.background)
    NavigationBar.setBorderColorAsync(colors.navigationBar.border)
  }, [])

  const loaded = authLoaded && !isThemeLoading
  if (!loaded) return null
  return authenticated ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
