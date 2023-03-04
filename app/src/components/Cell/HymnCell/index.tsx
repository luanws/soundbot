import React from 'react'
import { Container, HymnText } from './styles'

interface Props {
  hymn: string
  onPress?(hymn: string): void
}

const HymnCell: React.FC<Props> = (props) => {
  const { hymn, onPress } = props

  return (
    <Container activeOpacity={0.7} onPress={() => onPress?.(hymn)}>
      <HymnText>{hymn}</HymnText>
    </Container>
  )
}

export default HymnCell