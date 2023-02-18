import { Text, View } from "react-native"
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
    margin-top: 8px;
    padding: 8px;
`

export const TitleText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
    padding: 8px 16px;
`

export const BibleVersionsContainer = styled(View)`
    padding: 0px 16px;
`