import React, { memo } from 'react'
import { Container, HymnInfoContainer, HymnNameText, HymnNumberText, Button, ButtonContainer, PlayButtonIcon, ButtonText, StopButtonIcon } from './styles'

interface Props {
  hymn: string
  onPress?(hymn: string): void
  playing?: boolean
}

const HymnCell: React.FC<Props> = (props) => {
  const { hymn, onPress, playing } = props

  const hymnNumber = hymn.replace(/-.*/, '')
  const hymnName = hymn.replace(/.*- /, '').replace(/\.mp4$/, '')

  return (
    <Container>
      <HymnInfoContainer>
        <HymnNumberText>{hymnNumber}</HymnNumberText>
        <HymnNameText>{hymnName}</HymnNameText>
      </HymnInfoContainer>
      <ButtonContainer>
        <Button activeOpacity={0.7} onPress={() => onPress?.(hymn)}>
          {playing ? (
            <>
              <ButtonText>Parar</ButtonText>
              <StopButtonIcon name='controller-stop' />
            </>
          ) : (
            <>
              <ButtonText>Iniciar</ButtonText>
              <PlayButtonIcon name='controller-play' />
            </>
          )}
        </Button>
      </ButtonContainer>
    </Container>
  )
}

export default memo(HymnCell)