import React, { useCallback, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Menu, MenuItem } from 'react-native-material-menu'
import styles, { Container, MenuIcon } from './styles'

interface MenuItemType {
  label: string
  onPress: () => void
}

interface Props {
  items: MenuItemType[]
}

export default function (props: Props) {
  const menuRef = useRef<Menu>(null)

  const { items } = props

  const [visible, setVisible] = useState<boolean>(false)

  const handleOnPressMenuItem = useCallback((callback: () => void = () => { }) => {
    setVisible(false)
    callback()
  }, [menuRef])

  if (!items.length) return null

  return (
    <Container>
      <Menu
        ref={menuRef}
        style={styles.menuContainer}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setVisible(true)}>
            <MenuIcon name="dots-three-vertical" />
          </TouchableOpacity>
        }
      >
        {items.map(item => (
          <MenuItem
            key={item.label}
            onPress={() => handleOnPressMenuItem(item.onPress)}
            textStyle={styles.menuItemText}
          >{item.label}</MenuItem>
        ))}
      </Menu>
    </Container>
  )
}