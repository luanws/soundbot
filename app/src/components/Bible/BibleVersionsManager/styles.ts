import { Text, View } from "react-native"
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
`

export const TitleText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
    padding: 8px 16px;
`

export const BibleVersionsContainer = styled(View)`
    padding: 8px 16px;
`