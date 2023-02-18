import { Text, TouchableOpacity } from 'react-native'
import { styled } from "../../../../../hooks/theme"

export const NumberButton = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.containerBackground};
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border-color: ${({ theme }) => theme.colors.background};
    border-width: 2px;
`

export const NumberText = styled(Text)`
    color: ${props => props.theme.colors.text1};
    font-size: 16px;
`