import { Text, View } from "react-native"
import { styled } from "../../../hooks/theme"

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