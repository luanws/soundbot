import axios from 'axios'
import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { api } from '../../utils/api'
import usePersistedState from '../persisted-state'
import {
  AuthContextData
} from './auth.model'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [apiAddress, _setApiAddress] = usePersistedState<string>('api_address', '')

  const authLoaded = true
  const authenticated = !!apiAddress

  useEffect(() => {
    console.log('API address:', apiAddress)
    api.defaults.baseURL = apiAddress
  }, [apiAddress])

  useEffect(() => {
    checkConnection(apiAddress).then(connected => {
      if (!connected) _setApiAddress('')
    })
  }, [])

  async function checkConnection(apiAddress: string): Promise<boolean> {
    try {
      const { data } = await axios.get(apiAddress, { timeout: 1000 })
      return data === 'Soundbot remote API'
    } catch (error) {
      return false
    }
  }

  async function setApiAddress(apiAddress: string) {
    const connected = await checkConnection(apiAddress)
    if (connected) _setApiAddress(apiAddress)
  }

  function clearApiAddress() {
    _setApiAddress('')
  }

  return (
    <AuthContext.Provider
      value={{
        apiAddress,
        authLoaded,
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
