import { Text, TouchableOpacity, View } from "react-native"
import { styled } from "../../hooks/theme"

export const Container = styled(View)`
    flex: 1;
    padding: 16px;
`

export const ScanQRCodeButton = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
`

export const ScanQRCodeButtonText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
    text-align: center;
`