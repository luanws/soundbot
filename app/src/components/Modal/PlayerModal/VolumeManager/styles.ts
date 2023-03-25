import { styled } from "../../../../hooks/theme"
import { View, TouchableOpacity } from "react-native"
import { Feather } from '@expo/vector-icons'

export const Container = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 16px;
    margin-top: 16px;
`

export const SliderContainer = styled(View)`
    flex: 1;
`

export const VolumeButton = styled(TouchableOpacity)`
    padding: 8px;
`

export const VolumeIcon = styled(Feather)`
    color: ${({ theme }) => theme.colors.icon};
    font-size: 24px;
`