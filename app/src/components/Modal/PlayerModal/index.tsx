import React, { forwardRef } from 'react'
import VideoCell from '../../Cell/VideoCell'
import GestureModal, { GestureModalRef } from '../../GestureModal'
import { PlayModalContainer, PlayModalText } from './styles'

export interface PlayerModalRef extends GestureModalRef {
}

interface Props {
  stopVideo: () => void
  playingVideoFilename: string | null
}

const PlayerModal: React.ForwardRefRenderFunction<PlayerModalRef, Props> = (props, ref) => {
  const { playingVideoFilename, stopVideo } = props

  return (
    <GestureModal
      ref={ref}
      onClose={stopVideo}
      closeOnOverlayTap={false}
      onBackButtonPress={() => true}
      panGestureEnabled={false}
      withHandle={false}
    >
      {playingVideoFilename && (
        <PlayModalContainer>
          <PlayModalText>Reproduzindo</PlayModalText>
          <VideoCell filename={playingVideoFilename} playing onPress={stopVideo} />
        </PlayModalContainer>
      )}
    </GestureModal>
  )
}

export default forwardRef(PlayerModal)