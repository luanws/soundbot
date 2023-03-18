import { useNavigation } from '@react-navigation/native'
import React from 'react'
import CustomBibleVersePreview from '../../components/Bible/CustomBibleVersePreview'
import { BibleVerseDisplaySettings } from '../../models/bible-verse-display-settings'
import Storage from '../../utils/storage'
import { Container, PresetContainer, Scroll } from './styles'

const generalPreset: BibleVerseDisplaySettings = {
  fontSize: 32,
  margin: 64,
  fontFamily: 'Roboto',
}

const presets: { [key: string]: BibleVerseDisplaySettings } = {
  'dark': {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    referenceTextColor: '#ffffff',
  },
  'light': {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    referenceTextColor: '#000000',
  },
  'gruvbox': {
    backgroundColor: '#282828',
    textColor: '#ebdbb2',
    referenceTextColor: '#ebdbb2',
  },
  // 'gruvbox_dark': {
  //   backgroundColor: '#1d2021',
  //   textColor: '#ebdbb2',
  //   referenceTextColor: '#ebdbb2',
  // },
}

const BibleVerseDisplaySettingsScreen: React.FC = () => {
  const navigation = useNavigation()

  async function saveDisplaySettings(displaySettings: BibleVerseDisplaySettings) {
    Storage.set('bible_verse_display_settings', displaySettings)
    navigation.goBack()
  }

  return (
    <Scroll>
      <Container>
        {Object.keys(presets).map((presetName) => {
          const displaySettings = { ...generalPreset, ...presets[presetName] }

          function handlePresetPress() {
            saveDisplaySettings(displaySettings)
          }

          return (
            <PresetContainer key={presetName}>
              <CustomBibleVersePreview
                bibleVerse={{
                  text: 'Este é um texto fictício para testar a visualização customizada de versículos bíblicos.',
                  reference: {
                    bookName: 'Livro',
                    chapterNumber: 0,
                    verseNumber: 0
                  }
                }}
                onPress={() => handlePresetPress()}
                displaySettings={displaySettings}
              />
            </PresetContainer>
          )
        })}
      </Container>
    </Scroll>
  )
}

export default BibleVerseDisplaySettingsScreen