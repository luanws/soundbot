import React from 'react'
import { BibleVerse } from '../../../models/bible'
import { BibleVerseDisplaySettings } from '../../../models/bible-verse-display-settings'
import { BibleService } from '../../../services/bible'
import { BibleVerseDisplaySettingsService } from '../../../services/bible-verse-display-settings'
import { Button, PreviewWebView, PreviewWebViewContainer } from './styles'


interface Props {
  bibleVerse: BibleVerse
  displaySettings?: BibleVerseDisplaySettings
  onPress?(): void
}

const CustomBibleVersePreview: React.FC<Props> = (props) => {
  const { bibleVerse, displaySettings, onPress } = props
  const { text, reference } = bibleVerse

  const html = BibleVerseDisplaySettingsService.makeBibleVerseHTML(
    text,
    BibleService.bibleReferenceToString(reference),
    { ...displaySettings, fontSize: (displaySettings?.fontSize || 0) * 0.6 }
  )

  return (
    <Button onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <PreviewWebViewContainer pointerEvents='none'>
        <PreviewWebView source={{ html }} />
      </PreviewWebViewContainer>
    </Button >
  )
}

export default CustomBibleVersePreview