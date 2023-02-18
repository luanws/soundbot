import { Text, View } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
    background-color: ${({ theme }) => theme.colors.background};
`

export const TitleText = styled(Text)`
    color: ${props => props.theme.colors.text1};
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
    `

export const TabViewStyled = styled(TabView)`
    background-color: ${({ theme }) => theme.colors.background};
`