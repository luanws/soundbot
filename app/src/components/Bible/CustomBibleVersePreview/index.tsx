import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { BibleVerse } from '../../../models/bible'
import { BibleVerseDisplaySettings } from '../../../models/bible-verse-display-settings'
import { AppStackParamList } from '../../../routes/app.routes'
import { BibleService } from '../../../services/bible'
import { BibleVerseDisplaySettingsService } from '../../../services/bible-verse-display-settings'
import { Button, PreviewWebView, PreviewWebViewContainer } from './styles'


interface Props {
  bibleVerse: BibleVerse
  displaySettings?: BibleVerseDisplaySettings
}

const CustomBibleVersePreview: React.FC<Props> = (props) => {
  const { bibleVerse, displaySettings } = props
  const { text, reference } = bibleVerse

  const html = BibleVerseDisplaySettingsService.makeBibleVerseHTML(
    text,
    BibleService.bibleReferenceToString(reference),
    displaySettings
  )

  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  function handlePress() {
    navigation.navigate('BibleVerseDisplaySettings')
  }

  return (
    <Button onPress={handlePress}>
      <PreviewWebViewContainer pointerEvents='none'>
        <PreviewWebView source={{ html }} />
      </PreviewWebViewContainer>
    </Button >
  )
}

export default CustomBibleVersePreview