import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import CustomBibleVersePreview from '../../components/Bible/CustomBibleVersePreview'
import SwitchLabel from '../../components/SwitchLabel'
import { useSettings } from '../../hooks/settings'
import { BibleVerseDisplaySettings } from '../../models/bible-verse-display-settings'
import { AppStackParamList } from '../../routes/app.routes'
import Storage from '../../utils/storage'
import { PaddingHorizontalContainer, Scroll } from './styles'

const SettingsScreen: React.FC = () => {
  const { theme, setTheme } = useSettings()

  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  const [bibleVerseDisplaySettings, setBibleVerseDisplaySettings] = useState<BibleVerseDisplaySettings>({})

  useFocusEffect(useCallback(() => {
    Storage.get('bible_verse_display_settings').then(displaySettings => {
      setBibleVerseDisplaySettings(displaySettings || {})
    })
  }, []))

  function handleCustomBibleVersePreviewPress() {
    navigation.navigate('BibleVerseDisplaySettings')
  }

  return (
    <Scroll>
      <PaddingHorizontalContainer>
        <SwitchLabel
          label="Tema escuro"
          value={theme == 'dark'}
          onChange={isDark => setTheme(isDark ? 'dark' : 'light')}
        />
      </PaddingHorizontalContainer>
      <CustomBibleVersePreview
        bibleVerse={{
          text: 'Este é um texto fictício para testar a visualização customizada de versículos bíblicos.',
          reference: {
            bookName: 'Livro',
            chapterNumber: 0,
            verseNumber: 0
          }
        }}
        onPress={handleCustomBibleVersePreviewPress}
        displaySettings={bibleVerseDisplaySettings}
      />
    </Scroll>
  )
}

export default SettingsScreen