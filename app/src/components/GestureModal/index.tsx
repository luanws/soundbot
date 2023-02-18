import React, { forwardRef } from 'react'
import { Modalize, ModalizeProps } from 'react-native-modalize'
import { useTheme } from '../../hooks/theme'

export interface GestureModalRef extends Modalize {

}

export interface GestureModalProps extends ModalizeProps {
}

const GestureModal: React.ForwardRefRenderFunction<Modalize, GestureModalProps> = (props, ref) => {
  const theme = useTheme()

  return (
    <Modalize
      ref={ref}
      adjustToContentHeight
      modalStyle={{ backgroundColor: theme.colors.background }}
      {...props}
    />
  )
}

export default forwardRef(GestureModal)