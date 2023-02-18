import React, { useRef, useState } from 'react'
import { Modal } from 'react-native'
import BibleBar from '../../components/Bible/BibleBar'
import BibleReferenceSelector from '../../components/Bible/BibleReferenceSelector'
import BibleVersionsManager from '../../components/Bible/BibleVersionsManager'
import GestureModal, { GestureModalRef } from '../../components/GestureModal'
import { BibleReference } from '../../models/bible'
import { BibleService } from '../../services/bible'
import { Container } from './styles'

const BibleScreen: React.FC = (props) => {
  const bibleVersionsManagerModalizeRef = useRef<GestureModalRef>(null)

  const [bibleReferenceSelectorIsVisible, setBibleReferenceSelectorIsVisible] = useState<boolean>(false)

  const [selectedReference, setSelectedReference] = useState<BibleReference | undefined>()
  const [bibleVersion, setBibleVersion] = useState('NVI')
  const [bibleReference, setBibleReference] = useState<BibleReference | undefined>()

  function handleOpenBibleVersionsManager() {
    bibleVersionsManagerModalizeRef.current?.open()
  }

  function handleSelectVerse() {
    setBibleReferenceSelectorIsVisible(true)
  }

  function handleSelectReference(reference: BibleReference) {
    setBibleReference(reference)
    setBibleReferenceSelectorIsVisible(false)
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
      <Modal
        visible={bibleReferenceSelectorIsVisible}
        animationType='slide'
        onRequestClose={() => setBibleReferenceSelectorIsVisible(false)}
      >
        <BibleReferenceSelector onSelectReference={handleSelectReference} />
      </Modal>
      <GestureModal ref={bibleVersionsManagerModalizeRef}>
        <BibleVersionsManager />
      </GestureModal>
    </>
  )
}

export default BibleScreen