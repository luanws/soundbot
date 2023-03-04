import { Entypo } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
    padding: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const HymnInfoContainer = styled(View)`
    flex: 1;
`

export const HymnNumberText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 18px;
    padding: 4px;
    `

export const HymnNameText = styled(Text)`
    color: ${({ theme }) => theme.colors.text2};
    font-size: 16px;
    padding: 4px;
`

export const PlayButtonContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`

export const PlayButton = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.containerBackground};
    border-radius: 8px;
    padding: 8px 12px;
`

export const PlayButtonIcon = styled(Entypo)`
    color: ${({ theme }) => theme.colors.success};
    font-size: 20px;
    margin-left: 4px;
`

export const PlayButtonText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
`