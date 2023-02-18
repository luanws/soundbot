import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-native'
import BibleBar from '../../components/Bible/BibleBar'
import BibleReferenceSelector from '../../components/Bible/BibleReferenceSelector'
import BibleVersionsManager from '../../components/Bible/BibleVersionsManager'
import FloatActionButton from '../../components/FloatActionButton'
import GestureModal, { GestureModalRef } from '../../components/GestureModal'
import usePersistedState from '../../hooks/persisted-state'
import { Bible, BibleReference } from '../../models/bible'
import { BibleService } from '../../services/bible'
import { CommandService } from '../../services/command'
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
    updateBibleText()
  }, [bible, bibleReference])

  async function updateBibleText() {
    if (bible && bibleReference) {
      const bibleText = await BibleService.getTextFromBible(bible, bibleReference)
      setBibleText(bibleText)
      const referenceString = BibleService.bibleReferenceToString(bibleReference)
      await CommandService.showText(`${bibleText} (${referenceString})`)
    }
  }

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

  async function handleNextVerse() {
    if (bible && bibleReference) {
      const { reference, text } = await BibleService.getNextVerse(bible, bibleReference)
      setBibleReference(reference)
      setBibleText(text)
    }
  }

  async function handlePreviousVerse() {
    if (bible && bibleReference) {
      const previousVerse = await BibleService.getPreviousVerse(bible, bibleReference)
      setBibleReference(previousVerse.reference)
      setBibleText(previousVerse.text)
    }
  }

  return (
    <>
      <Container>
        <BibleBar
          reference={bibleReference}
          version={bibleVersion}
          onPressVersion={handleOpenBibleVersionsManager}
          onPressReference={handleSelectVerse}
        />
        {bibleText && (
          <BibleTextContainer>
            <BibleText>{bibleText}</BibleText>
          </BibleTextContainer>
        )}
      </Container>
      <FloatActionButton
        icon='MaterialIcons/navigate-before'
        position='left'
        size={48}
        onPress={handlePreviousVerse}
      />
      <FloatActionButton
        icon='MaterialIcons/navigate-next'
        position='right'
        size={48}
        onPress={handleNextVerse}
      />
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