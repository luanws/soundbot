import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { styled } from "../../../../hooks/theme"

export const Scroll = styled(ScrollView)`
`

export const Container = styled(View)`
    padding: 16px 8px;
`

export const BookNameButton = styled(TouchableOpacity)`
    padding: 16px;
`

export const BookNameText = styled(Text)`
    color: ${props => props.theme.colors.text1};
    font-size: 16px;
`