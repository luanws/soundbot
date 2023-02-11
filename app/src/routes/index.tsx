import * as NavigationBar from 'expo-navigation-bar'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useAuth } from '../hooks/auth'
import { useTheme } from '../hooks/theme'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

const Routes: React.FC = () => {
  const { loaded, authenticated } = useAuth()
  const { colors } = useTheme()

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.navigationBar.background)
    NavigationBar.setBorderColorAsync(colors.navigationBar.border)
  }, [])

  if (!loaded) return <Loading />
  return authenticated ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
