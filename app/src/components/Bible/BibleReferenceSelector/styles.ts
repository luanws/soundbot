import { View, Text } from 'react-native'
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
`

export const TitleText = styled(Text)`
    color: ${props => props.theme.colors.text1};
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
`