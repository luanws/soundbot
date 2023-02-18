import React, { useRef, useState } from 'react'
import BibleBar from '../../components/Bible/BibleBar'
import BibleVersionsManager from '../../components/Bible/BibleVersionsManager'
import GestureModal, { GestureModalRef } from '../../components/GestureModal'
import { BibleReference } from '../../models/bible'
import { BibleService } from '../../services/bible'
import { Container } from './styles'

const BibleScreen: React.FC = (props) => {
  const bibleVersionsManagerModalizeRef = useRef<GestureModalRef>(null)

  const [bibleVersion, setBibleVersion] = useState('NVI')
  const [bibleReference, setBibleReference] = useState<BibleReference | undefined>()

  function handleOpenBibleVersionsManager() {
    bibleVersionsManagerModalizeRef.current?.open()
  }

  function handleSelectVerse() {
    console.log('handleSelectVerse')
  }

  return (
    <>
      <Container>
        <BibleBar
          text={bibleReference ? BibleService.bibleReferenceToString(bibleReference) : 'Selecione um versículo'}
          version={bibleVersion}
          onPressVersion={handleOpenBibleVersionsManager}
          onPressReference={handleSelectVerse}
        />
      </Container>
      <GestureModal ref={bibleVersionsManagerModalizeRef}>
        <BibleVersionsManager />
      </GestureModal>
    </>
  )
}

export default BibleScreen