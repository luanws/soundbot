import { Entypo } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
    padding: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const VideoInfoContainer = styled(View)`
    flex: 1;
`


export const VideoNameText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
    padding: 4px;
`

export const ButtonContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`

export const Button = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.containerBackground};
    border-radius: 8px;
    padding: 8px 12px;
`

export const ButtonText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
`

export const PlayButtonIcon = styled(Entypo)`
    color: ${({ theme }) => theme.colors.success};
    font-size: 20px;
    margin-left: 4px;
`

export const StopButtonIcon = styled(Entypo)`
    color: ${({ theme }) => theme.colors.danger};
    font-size: 20px;
    margin-left: 4px;
`