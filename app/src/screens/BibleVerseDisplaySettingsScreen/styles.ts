import { MaterialIcons } from "@expo/vector-icons"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styled } from "../../hooks/theme"

export const Scroll = styled(ScrollView)`
`

export const Container = styled(View)`
    flex: 1;
`

export const PresetContainer = styled(View)`
`

export const PresetName = styled(Text)`
    font-size: 16px;
    font-weight: bold;
    padding: 8px 16px;
    color: ${props => props.theme.colors.title};
    text-align: center;
    text-transform: uppercase;
`

export const NavigationButtonsContainer = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 8px;
`

export const NavigationButton = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.containerBackground};
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 8px;
    margin: 8px;
`

export const NavigationButtonIcon = styled(MaterialIcons)`
    font-size: 32px;
    color: ${({ theme }) => theme.colors.icon};
`