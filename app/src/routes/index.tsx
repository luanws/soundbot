
import React from 'react'
import { useAuth } from '../hooks/auth'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

const Routes: React.FC = () => {
  const { authenticated } = useAuth()
  return authenticated ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
