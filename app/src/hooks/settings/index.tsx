import React from 'react'
import { createContext, PropsWithChildren, useContext } from "react"
import { ThemeTypes } from '../../utils/theme/theme.model'
import usePersistedState from "../persisted-state"

interface SettingsContextData {
  theme: ThemeTypes
  setTheme(theme: ThemeTypes): void
}

const SettingsContext = createContext({} as SettingsContextData)

export function SettingsProvider({ children }: PropsWithChildren<{}>) {
  const [theme, setTheme] = usePersistedState<ThemeTypes>('theme', 'light')

  return (
    <SettingsContext.Provider value={{
      theme,
      setTheme
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}