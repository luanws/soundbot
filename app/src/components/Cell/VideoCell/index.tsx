import React, { memo } from 'react'
import { Button, ButtonContainer, ButtonText, Container, PlayButtonIcon, StopButtonIcon, VideoInfoContainer, VideoNameText } from './styles'

interface Props {
  filename: string
  onPress?(filename: string): void
  playing?: boolean
}

const VideoCell: React.FC<Props> = (props) => {
  const { filename, onPress, playing } = props

  return (
    <Container>
      <VideoInfoContainer>
        <VideoNameText>{filename}</VideoNameText>
      </VideoInfoContainer>
      <ButtonContainer>
        <Button activeOpacity={0.7} onPress={() => onPress?.(filename)}>
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

export default memo(VideoCell)