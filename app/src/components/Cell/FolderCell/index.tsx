import React, { memo } from 'react'
import { Container, FolderIcon, FolderNameText } from './styles'

interface Props {
  directory: string
  onPress?(directory: string): void
}

const FolderCell: React.FC<Props> = (props) => {
  const { directory, onPress } = props

  return (
    <Container activeOpacity={0.7} onPress={() => onPress?.(directory)}>
      <FolderIcon name='file-directory' />
      <FolderNameText>{directory}</FolderNameText>
    </Container>
  )
}

export default memo(FolderCell)