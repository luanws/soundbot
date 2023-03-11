import { Text, View } from "react-native"
import { styled } from "../../hooks/theme"

export const TodayTasteAndSeeContainer = styled(View)`
    background-color: ${({ theme }) => theme.colors.background};
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.successContainer};
    border-radius: 8px;
    margin: 16px;
`

export const Divider = styled(View)`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.divider};
`

export const TodayTasteAndSeeTitleText = styled(Text)`
    color: ${({ theme }) => theme.colors.success};
    margin: 16px;
    margin-bottom: 0px;
    font-weight: bold;
    font-size: 18px;
`

export const TodayTasteAndSeeInfoText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    margin: 16px;
    margin-bottom: 0px;
`