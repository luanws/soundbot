import { Feather, MaterialIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from "react-native"
import { styled } from "../../../../hooks/theme"

export const Container = styled(TouchableOpacity)`
    padding: 8px;
    padding-left: 12px;
    padding-right: 16px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
`

export const VersionNameText = styled(Text)`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text1};
    margin: 4px;
`

export const DownloadButton = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    `

export const DownloadButtonIcon = styled(Feather)`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.icon};    
`

export const DownloadButtonText = styled(Text)`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text1};
    margin-right: 8px;
`

export const DownloadedContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

export const SelectedIcon = styled(Feather)`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.success};    
    margin-right: 8px;
`

export const SelectedButtonText = styled(Text)`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.success};
`

export const DeleteButton = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    margin-left: 8px;
`

export const DeleteButtonIcon = styled(MaterialIcons)`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.danger};
`