import { Octicons } from "@expo/vector-icons"
import { Text, TouchableOpacity } from "react-native"
import { styled } from "../../../hooks/theme"

export const Container = styled(TouchableOpacity)`
    padding: 16px;
    flex-direction: row;
    align-items: center;
`

export const FolderNameText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
    padding: 4px;
`

export const FolderIcon = styled(Octicons)`
    color: ${({ theme }) => theme.colors.icon};
    font-size: 24px;
    margin-right: 12px;
`