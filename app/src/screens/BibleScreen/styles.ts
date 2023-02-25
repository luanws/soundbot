import { Text, View, ScrollView } from "react-native"
import { styled } from "../../hooks/theme"

export const Container = styled(View)`
    flex: 1;
`

export const ContentContainer = styled(ScrollView)`
    flex: 1;
`

export const BibleTextContainer = styled(View)`
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.successContainer};
    border-radius: 4px;
    margin: 0px 16px;
    margin-bottom: 8px;
`

export const BibleText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
`

export const WarningContainer = styled(View)`
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.warningContainer};
    border-radius: 4px;
    margin: 0px 16px;
    margin-bottom: 8px;
`

export const WarningText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
`