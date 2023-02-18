import { View } from 'react-native'
import { styled } from "../../../../hooks/theme"

interface ContainerProps {
    padding: number
}

export const Container = styled(View) <ContainerProps>`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: ${({ padding }) => padding}px;
`