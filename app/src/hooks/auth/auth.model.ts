export interface AuthContextData {
    apiAddress: string
    authenticated: boolean
    authLoaded: boolean
    setApiAddress(apiAddress: string): void
    clearApiAddress(): void
}