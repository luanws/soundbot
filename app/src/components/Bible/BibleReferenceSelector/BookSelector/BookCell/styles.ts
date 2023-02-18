import { Text, TouchableOpacity } from 'react-native'
import { styled } from "../../../../../hooks/theme"

export const BookNameButton = styled(TouchableOpacity)`
    padding: 24px;
`

export const BookNameText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
`