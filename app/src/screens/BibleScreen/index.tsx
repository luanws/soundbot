import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-native'
import BibleBar from '../../components/Bible/BibleBar'
import BibleReferenceSelector from '../../components/Bible/BibleReferenceSelector'
import BibleVersionsManager from '../../components/Bible/BibleVersionsManager'
import GestureModal, { GestureModalRef } from '../../components/GestureModal'
import usePersistedState from '../../hooks/persisted-state'
import { Bible, BibleReference } from '../../models/bible'
import { BibleService } from '../../services/bible'
import { BibleText, BibleTextContainer, Container } from './styles'

const BibleScreen: React.FC = (props) => {
  const bibleVersionsManagerModalizeRef = useRef<GestureModalRef>(null)

  const [bibleReferenceSelectorIsVisible, setBibleReferenceSelectorIsVisible] = useState<boolean>(false)

  const [bible, setBible] = useState<Bible | undefined>()
  const [bibleVersion, setBibleVersion] = usePersistedState<string>('bible-version-selected', 'ARA')
  const [bibleReference, setBibleReference] = useState<BibleReference | undefined>()
  const [bibleText, setBibleText] = useState<string>('')

  useEffect(() => {
    BibleService.getBible(bibleVersion).then(setBible)
  }, [bibleVersion])

  useEffect(() => {
    if (bible && bibleReference) {
      BibleService.getTextFromBible(bible, bibleReference).then(setBibleText)
    }
  }, [bible, bibleReference])

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
        <BibleTextContainer>
          <BibleText>{bibleText}</BibleText>
        </BibleTextContainer>
      </Container>
      <Modal
        visible={bibleReferenceSelectorIsVisible}
        animationType='slide'
        onRequestClose={() => setBibleReferenceSelectorIsVisible(false)}
      >
        {!!bible && (
          <BibleReferenceSelector
            bible={bible}
            onSelectReference={handleSelectReference}
          />
        )}
      </Modal>
      <GestureModal ref={bibleVersionsManagerModalizeRef}>
        <BibleVersionsManager
          selectedVersion={bibleVersion}
          onVersionSelect={setBibleVersion}
        />
      </GestureModal>
    </>
  )
}

export default BibleScreen