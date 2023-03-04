import { MaterialIcons } from '@expo/vector-icons'
import { TextInputProps, TouchableOpacity, View, TextInput } from 'react-native'
import { styled } from '../../../hooks/theme'

export const Container = styled(View)`
    flex: 1;
    padding-top: 8px;
`

export const ContainerSearch = styled(View)`
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.containerBackground};
    elevation: 3;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 12px;
    margin-bottom: 8px;
    z-index: 5000;
    margin: 0px 16px;
`

export const IconButton = styled(TouchableOpacity)`
    height: 48px;
    justify-content: center;
`

export const SearchTextInput = styled(TextInput).attrs(({ theme }) => {
    const props: TextInputProps = {
        placeholderTextColor: theme.colors.placeholder,
    }
    return props
})`
    padding: 8px 0px;
    margin: 0px 8px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text1};
    flex: 1;
    height: 100%;
`

export const ListItemsContainer = styled(View)`
    flex: 1;
`

export const SearchIcon = styled(MaterialIcons).attrs({ name: 'search' })`
    color: ${({ theme }) => theme.colors.icon};
    font-size: 24px;
`

export const ClearIcon = styled(MaterialIcons).attrs({ name: 'clear' })`
    color: ${({ theme }) => theme.colors.icon};
    font-size: 24px;
`