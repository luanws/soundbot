import React from 'react'
import Icon from '../../../components/Icon'
import { useTheme } from '../../../hooks/theme'
import { Theme } from '../../../theme/theme.model'


interface Props {
  icon: string
  focused: boolean
}

const DrawerIcon: React.FC<Props> = ({ icon, focused }) => {
  const theme = useTheme() as Theme

  return (
    <Icon
      icon={icon}
      size={24}
      color={focused ? theme.colors.navigationDrawer.activeContent : theme.colors.navigationDrawer.content}
    />
  )
}

export default DrawerIcon