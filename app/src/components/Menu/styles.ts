import { Entypo } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import { styled } from '../../hooks/theme'

export const Container = styled(View)`
    flex-direction: row;
    align-items: center;
`

export const MenuIcon = styled(Entypo)`
    font-size: 18px;
    color: white;
    margin: 0px;
    margin-right: -16px;
    padding: 12px;
`

const styles = StyleSheet.create({
    menuContainer: {
        width: 8 * 24,
    },
    menuItemText: {
        fontSize: 16
    },
})

export default styles