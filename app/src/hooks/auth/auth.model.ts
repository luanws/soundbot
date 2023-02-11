export interface AuthContextData {
    apiAddress: string
    authenticated: boolean
    loaded: boolean
    setApiAddress(apiAddress: string): void
}