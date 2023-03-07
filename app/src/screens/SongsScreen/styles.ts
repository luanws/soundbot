import { Text, View } from "react-native"
import { styled } from "../../hooks/theme"

export const Container = styled(View)`
`

export const FileTreeContainer = styled(View)`
    flex: 1;
`

export const FileTreeCurrentPathContainer = styled(View)`
    padding: 8px 16px;
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

export const PlayModalContainer = styled(View)`
    padding: 16px 0px;
`

export const PlayModalText = styled(Text)`
    color: ${({ theme }) => theme.colors.info};
    font-size: 18px;
    font-weight: 500;
    padding: 2px 16px;
    padding-bottom: 0px;
`