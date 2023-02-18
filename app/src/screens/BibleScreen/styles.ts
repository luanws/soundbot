import { View, Text } from "react-native"
import { styled } from "../../hooks/theme"

export const Container = styled(View)`
`

export const BibleTextContainer = styled(View)`
    padding: 16px;
`

export const BibleText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
`