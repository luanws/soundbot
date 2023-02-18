import React, { useRef } from 'react'
import BibleBar from '../../components/Bible/BibleBar'
import BibleVersionsManager from '../../components/Bible/BibleVersionsManager'
import GestureModal, { GestureModalRef } from '../../components/GestureModal'
import { Container } from './styles'

interface Props {
}

const BibleScreen: React.FC<Props> = (props) => {
  const bibleVersionsManagerModalizeRef = useRef<GestureModalRef>(null)

  function handleOpenBibleVersionsManager() {
    bibleVersionsManagerModalizeRef.current?.open()
  }

  return (
    <>
      <Container>
        <BibleBar
          onPressVersion={handleOpenBibleVersionsManager}
        />
      </Container>
      <GestureModal ref={bibleVersionsManagerModalizeRef}>
        <BibleVersionsManager />
      </GestureModal>
    </>
  )
}

export default BibleScreen