import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { api } from '../../utils/api'
import usePersistedState from '../persisted-state'
import {
  AuthContextData
} from './auth.model'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [apiAddress, setApiAddress] = usePersistedState<string>('api_address', '')

  const loaded = true
  const authenticated = !!apiAddress

  useEffect(() => {
    console.log('API address:', apiAddress)
    api.defaults.baseURL = apiAddress
  }, [apiAddress])

  function clearApiAddress() {
    setApiAddress('')
  }

  return (
    <AuthContext.Provider
      value={{
        apiAddress,
        loaded,
        authenticated,
        setApiAddress,
        clearApiAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
