import { Text, View } from "react-native"
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
    margin-bottom: 16px;
    width: 100%;
`

export const TitleContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const TitleText = styled(Text)`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text1};
    padding-left: 8px;
    margin-bottom: 8px;
`

export const DescriptionText = styled(Text)`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text3};
    margin-bottom: 8px;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 12px;
    line-height: 20px;
    border-radius: 8px;
    border-color: ${({ theme }) => theme.colors.containerBackground};
    border-width: 1px;
`

export const Content = styled(View)`
    margin-top: 8px;
    margin-bottom: 8px;
`