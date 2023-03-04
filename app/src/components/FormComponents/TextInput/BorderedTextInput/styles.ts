import { Animated, TextInput as _TextInput, View } from 'react-native'
import { styled } from '../../../../hooks/theme'
import _Icon from '../../../Icon'

interface ContainerProps {
    isFocused: boolean
    hasError: boolean
}

export const Container = styled(View) <ContainerProps>`
    flex: 1;
    height: 56px;
    padding: 0px 16px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    border-width: 2px;
    margin-bottom: 16px;
    border-color: ${({ theme, isFocused, hasError }) => {
        if (hasError) return theme.colors.danger
        else if (isFocused) return theme.colors.focused
        else return theme.colors.unfocused
    }};
`

interface PlaceholderLabelContainerProps {
    hasIcon: boolean
}

export const PlaceholderLabelContainer = styled(Animated.View) <PlaceholderLabelContainerProps>`
    position: absolute;
    top: 14px;
    left: ${({ hasIcon }) => hasIcon ? 40 : 8}px;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 0px 8px;
`

interface PlaceholderLabelProps {
    isFocused: boolean
}

export const PlaceholderLabel = styled(Animated.Text) <PlaceholderLabelProps>`
    color: ${({ theme, isFocused }) => {
        if (isFocused) return theme.colors.focused
        return theme.colors.placeholder
    }};
    font-size: 16px;
`

export const TextInputStyled = styled(_TextInput)`
    flex: 1;
    height: 100%;
    color: ${({ theme }) => theme.colors.focused};
    font-size: 16px;
`

interface IconProps {
    isFocused: boolean
}

export const Icon = styled(_Icon) <IconProps>`
    margin-right: 8px;
    color: ${({ theme, isFocused }) => {
        return isFocused ? theme.colors.focused : theme.colors.unfocusedIcon
    }};
    font-size: 20px;
`