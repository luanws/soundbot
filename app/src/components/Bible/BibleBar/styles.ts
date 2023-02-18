import { View, Text, TouchableOpacity } from 'react-native'
import { styled } from '../../../hooks/theme'

export const Container = styled(View)`
    flex-direction: row;
    align-items: center;
    /* justify-content: space-between; */
    padding: 0 16px;
    margin: 8px;
    background-color: ${({ theme }) => theme.colors.background};
`

export const ReferenceButton = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.containerBackground};
    padding: 8px 16px;
    border-top-left-radius: 1000px;
    border-bottom-left-radius: 1000px;
`

export const ReferenceText = styled(Text)`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text1};
`

export const VersionButton = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.containerBackground};
    padding: 8px 16px;
    border-top-right-radius: 1000px;
    border-bottom-right-radius: 1000px;
    margin-left: 2px;
`

export const VersionText = styled(Text)`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text1};
`