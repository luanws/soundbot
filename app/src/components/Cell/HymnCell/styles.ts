import { Text, TouchableOpacity } from "react-native"
import { styled } from "../../../hooks/theme"

export const Container = styled(TouchableOpacity)`
    padding: 16px;
`

export const HymnText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 18px;
`