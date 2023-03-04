import React, { memo } from 'react'
import { Container, HymnInfoContainer, HymnNameText, HymnNumberText, PlayButton, PlayButtonContainer, PlayButtonIcon, PlayButtonText } from './styles'

interface Props {
  hymn: string
  onPress?(hymn: string): void
}

const HymnCell: React.FC<Props> = (props) => {
  const { hymn, onPress } = props

  const hymnNumber = hymn.replace(/-.*/, '')
  const hymnName = hymn.replace(/.*- /, '').replace(/\.mp4$/, '')

  return (
    <Container>
      <HymnInfoContainer>
        <HymnNumberText>{hymnNumber}</HymnNumberText>
        <HymnNameText>{hymnName}</HymnNameText>
      </HymnInfoContainer>
      <PlayButtonContainer>
        <PlayButton activeOpacity={0.7} onPress={() => onPress?.(hymn)}>
          <PlayButtonText>Iniciar</PlayButtonText>
          <PlayButtonIcon name='controller-play' />
        </PlayButton>
      </PlayButtonContainer>
    </Container>
  )
}

export default memo(HymnCell)