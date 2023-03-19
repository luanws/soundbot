
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import CustomBibleVersePreview from '../../components/Bible/CustomBibleVersePreview'
import FloatActionButton from '../../components/FloatActionButton'
import SliderInput from '../../components/FormComponents/SliderInput'
import { BibleVerseDisplaySettingsService } from '../../services/bible-verse-display-settings'
import { generalPreset, presets } from './presets'
import { Container, NavigationButton, NavigationButtonIcon, NavigationButtonsContainer, PresetContainer, PresetName } from './styles'

const BibleVerseDisplaySettingsScreen: React.FC = () => {
  const navigation = useNavigation()

  const [presetName, setPresetName] = useState<string>(Object.keys(presets)[0])
  const [displaySettings, setDisplaySettings] = useState({ ...generalPreset, ...presets[presetName] })

  useEffect(() => {
    updateDisplaySettings()
  }, [])

  useEffect(() => {
    setDisplaySettings(displaySettings => ({ ...displaySettings, ...presets[presetName] }))
  }, [presetName])

  async function updateDisplaySettings() {
    const displaySettings = await BibleVerseDisplaySettingsService.getDisplaySettings()
    if (displaySettings) {
      setDisplaySettings(displaySettings)
    }
  }

  async function saveDisplaySettings() {
    BibleVerseDisplaySettingsService.saveDisplaySettings(displaySettings)
    navigation.goBack()
  }

  function handleNextPreset() {
    const presetNames = Object.keys(presets)
    const presetIndex = presetNames.indexOf(presetName)
    const nextPresetName = presetNames[presetIndex + 1] || presetNames[0]
    setPresetName(nextPresetName)
  }

  function handlePreviousPreset() {
    const presetNames = Object.keys(presets)
    const presetIndex = presetNames.indexOf(presetName)
    const previousPresetName = presetNames[presetIndex - 1] || presetNames[presetNames.length - 1]
    setPresetName(previousPresetName)
  }

  return (
    <>
      <Container>
        <PresetContainer>
          <PresetName>{presetName}</PresetName>
          <CustomBibleVersePreview
            bibleVerse={{
              text: 'Este é um texto fictício para testar a visualização customizada de versículos bíblicos.',
              reference: {
                bookName: 'Livro',
                chapterNumber: 0,
                verseNumber: 0
              }
            }}
            displaySettings={displaySettings}
          />
        </PresetContainer>
        <NavigationButtonsContainer>
          <NavigationButton activeOpacity={0.7} onPress={handlePreviousPreset}>
            <NavigationButtonIcon name='navigate-before' />
          </NavigationButton>
          <NavigationButton activeOpacity={0.7} onPress={handleNextPreset}>
            <NavigationButtonIcon name='navigate-next' />
          </NavigationButton>
        </NavigationButtonsContainer>
        <SliderInput
          label='Tamanho da fonte'
          minimumValue={0}
          maximumValue={100}
          step={1}
          formatValue={value => `${value}`}
          value={displaySettings.fontSize || 0}
          onValueChange={fontSize => setDisplaySettings(displaySettings => ({ ...displaySettings, fontSize }))}
        />
        <SliderInput
          label='Margem'
          minimumValue={0}
          maximumValue={200}
          step={1}
          formatValue={value => `${value}`}
          value={displaySettings.margin || 0}
          onValueChange={margin => setDisplaySettings(displaySettings => ({ ...displaySettings, margin }))}
        />
      </Container >
      <FloatActionButton
        icon='MaterialIcons/check'
        onPress={saveDisplaySettings}
        position='right'
      />
    </>
  )
}

export default BibleVerseDisplaySettingsScreen