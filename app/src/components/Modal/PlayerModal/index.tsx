import React, { forwardRef } from 'react'
import VideoCell from '../../Cell/VideoCell'
import GestureModal, { GestureModalRef } from '../../GestureModal'
import { PlayModalContainer, PlayModalText } from './styles'
import VolumeManager from './VolumeManager'

export interface PlayerModalRef extends GestureModalRef {
}

interface Props {
  stopVideo: () => void
  playingVideoFilename: string | null
  renderVideoCell?: (filename: string) => React.ReactNode
}

const PlayerModal: React.ForwardRefRenderFunction<PlayerModalRef, Props> = (props, ref) => {
  const { playingVideoFilename, stopVideo, renderVideoCell } = props

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
          <VolumeManager />
          {renderVideoCell ? renderVideoCell(playingVideoFilename) : (
            <VideoCell filename={playingVideoFilename} playing onPress={stopVideo} />
          )}
        </PlayModalContainer>
      )}
    </GestureModal>
  )
}

export default forwardRef(PlayerModal)