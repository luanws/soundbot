import { Text, View } from "react-native"
import { styled } from "../../hooks/theme"

export const Container = styled(View)`
`

export const FileTreeContainer = styled(View)`
`

export const FileTreeCurrentPathContainer = styled(View)`
    padding: 16px;
`

export const Divider = styled(View)`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.divider};
    margin: 0px 8px;
`

export const FileTreeCurrentPathText = styled(Text)`
    color: ${({ theme }) => theme.colors.info};
    font-size: 16px;
`