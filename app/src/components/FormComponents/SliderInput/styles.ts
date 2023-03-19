import { Text, View } from "react-native"
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
    margin-bottom: 8px;
`

export const TextsContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0px 16px;
    margin-bottom: 8px;
`

export const LabelText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
`

export const ValueText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
`