import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-native'
import BibleBar from '../../components/Bible/BibleBar'
import BibleReferenceSelector from '../../components/Bible/BibleReferenceSelector'
import BibleVersionsManager from '../../components/Bible/BibleVersionsManager'
import FloatActionButton from '../../components/FloatActionButton'
import GestureModal, { GestureModalRef } from '../../components/GestureModal'
import usePersistedState from '../../hooks/persisted-state'
import { BibleReference } from '../../models/bible'
import { BibleService } from '../../services/bible'
import { CommandService } from '../../services/command'
import { BibleText, BibleTextContainer, Container } from './styles'

const BibleScreen: React.FC = (props) => {
  const bibleVersionsManagerModalizeRef = useRef<GestureModalRef>(null)

  const [bibleReferenceSelectorIsVisible, setBibleReferenceSelectorIsVisible] = useState<boolean>(false)

  const [bibleVersion, setBibleVersion] = usePersistedState<string>('bible-version-selected', 'ARA')
  const [bibleReference, setBibleReference] = useState<BibleReference | undefined>()
  const [bibleText, setBibleText] = useState<string>('')

  useEffect(() => {
    updateBibleText()
  }, [bibleVersion, bibleReference])

  async function updateBibleText() {
    if (bibleVersion && bibleReference) {
      const bibleText = await BibleService.getTextFromBible(bibleVersion, bibleReference)
      if (bibleText) {
        setBibleText(bibleText)
        const referenceString = BibleService.bibleReferenceToString(bibleReference)
        await CommandService.showText(`${bibleText} (${referenceString})`)
      } else {
        handleVerseNotFound()
      }
    }
  }

  function handleVerseNotFound() {
    setBibleText('Versículo não encontrado')
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
    if (bibleVersion && bibleReference) {
      const nextVerse = await BibleService.getNextVerse(bibleVersion, bibleReference)
      if (nextVerse) {
        const { reference, text } = nextVerse
        setBibleReference(reference)
        setBibleText(text)
      } else {
        handleVerseNotFound()
      }
    }
  }

  async function handlePreviousVerse() {
    if (bibleVersion && bibleReference) {
      const previousVerse = await BibleService.getPreviousVerse(bibleVersion, bibleReference)
      if (previousVerse) {
        const { reference, text } = previousVerse
        setBibleReference(reference)
        setBibleText(text)
      } else {
        handleVerseNotFound()
      }
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
        onPress={handlePreviousVerse}
      />
      <FloatActionButton
        icon='MaterialIcons/navigate-next'
        position='right'
        onPress={handleNextVerse}
      />
      <Modal
        visible={bibleReferenceSelectorIsVisible}
        animationType='slide'
        onRequestClose={() => setBibleReferenceSelectorIsVisible(false)}
      >
        {!!bibleVersion && (
          <BibleReferenceSelector
            bibleVersion={bibleVersion}
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