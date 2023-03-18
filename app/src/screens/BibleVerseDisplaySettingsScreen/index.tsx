import React, { useEffect, useState } from 'react'
import CustomBibleVersePreview from '../../components/Bible/CustomBibleVersePreview'
import FloatActionButton from '../../components/FloatActionButton'
import BorderedTextInput from '../../components/FormComponents/TextInput/BorderedTextInput'
import usePersistedState from '../../hooks/persisted-state'
import { BibleVerseDisplaySettings } from '../../models/bible-verse-display-settings'
import { BibleVerseDisplaySettingsService } from '../../services/bible-verse-display-settings'
import { Container, FormContainer, FormScroll } from './styles'

const BibleVerseDisplaySettingsScreen: React.FC = () => {
  const [bibleVerseDisplaySettings, setBibleVerseDisplaySettings] = usePersistedState<BibleVerseDisplaySettings>(
    'bible_verse_display_settings', {}
  )

  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(undefined)
  const [fontSize, setFontSize] = useState<number | undefined>(undefined)
  const [textColor, setTextColor] = useState<string | undefined>(undefined)
  const [referenceTextColor, setReferenceTextColor] = useState<string | undefined>(undefined)
  const [margin, setMargin] = useState<number | undefined>(undefined)
  const [fontFamily, setFontFamily] = useState<string | undefined>(undefined)

  useEffect(() => {
    const displaySettings = Object.assign({},
      BibleVerseDisplaySettingsService.defaultBibleVerseDisplaySettings,
      bibleVerseDisplaySettings,
    )
    setBackgroundColor(displaySettings.backgroundColor)
    setFontSize(displaySettings.fontSize)
    setTextColor(displaySettings.textColor)
    setReferenceTextColor(displaySettings.referenceTextColor)
    setMargin(displaySettings.margin)
    setFontFamily(displaySettings.fontFamily)
  }, [bibleVerseDisplaySettings])

  async function handleSavePress() {
    setBibleVerseDisplaySettings({
      backgroundColor: backgroundColor || undefined,
      fontSize: fontSize || undefined,
      textColor: textColor || undefined,
      referenceTextColor: referenceTextColor || undefined,
      margin: margin || undefined,
      fontFamily: fontFamily || undefined
    })
  }

  return (
    <>
      <Container>
        <CustomBibleVersePreview
          bibleVerse={{
            text: 'Este é um texto fictício para testar a visualização customizada de versículos bíblicos.',
            reference: {
              bookName: 'Livro',
              chapterNumber: 0,
              verseNumber: 0
            }
          }}
          displaySettings={bibleVerseDisplaySettings}
        />
        <FormScroll>
          <FormContainer>
            <BorderedTextInput
              placeholder='Cor de fundo'
              value={backgroundColor}
              onChangeText={setBackgroundColor}
            />
            <BorderedTextInput
              placeholder='Tamanho da fonte'
              value={fontSize?.toString()}
              onChangeText={text => setFontSize(Number(text))}
              keyboardType='numeric'
            />
            <BorderedTextInput
              placeholder='Cor do texto'
              value={textColor}
              onChangeText={setTextColor}
            />
            <BorderedTextInput
              placeholder='Cor do texto da referência'
              value={referenceTextColor}
              onChangeText={setReferenceTextColor}
            />
            <BorderedTextInput
              placeholder='Margem'
              value={margin?.toString()}
              onChangeText={text => setMargin(Number(text))}
              keyboardType='numeric'
            />
            <BorderedTextInput
              placeholder='Fonte'
              value={fontFamily}
              onChangeText={setFontFamily}
            />
          </FormContainer>
        </FormScroll>
      </Container>
      <FloatActionButton
        icon='Feather/check'
        position='right'
        onPress={handleSavePress}
      />
    </>
  )
}

export default BibleVerseDisplaySettingsScreen