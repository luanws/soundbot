import React, { PropsWithChildren } from 'react'
import { AuthProvider } from './auth'
import { SettingsProvider } from './settings'
import { ThemeProvider } from './theme'

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <SettingsProvider>
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  </SettingsProvider>
)

export default AppProvider
