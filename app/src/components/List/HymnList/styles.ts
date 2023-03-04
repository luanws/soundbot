import { View } from "react-native"
import { styled } from "../../../hooks/theme"

export const Separator = styled(View)`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.divider};
    margin: 4px 8px;
`