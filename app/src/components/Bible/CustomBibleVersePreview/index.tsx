import React from 'react'
import { BibleReference, BibleVerse } from '../../../models/bible'
import { BibleVerseDisplaySettings } from '../../../models/bible-verse-display-settings'
import { BibleService } from '../../../services/bible'
import { BibleVerseDisplaySettingsService } from '../../../services/bible-verse-display-settings'
import { Container, PreviewWebView } from './styles'


interface Props {
  bibleVerse: BibleVerse
  bibleVerseHTMLStyleProps?: BibleVerseDisplaySettings
}

const CustomBibleVersePreview: React.FC<Props> = (props) => {
  const { bibleVerse, bibleVerseHTMLStyleProps } = props
  const { text, reference } = bibleVerse
  
  const html = BibleVerseDisplaySettingsService.makeBibleVerseHTML(
    text,
    BibleService.bibleReferenceToString(reference),
    bibleVerseHTMLStyleProps
  )

  return (
    <Container pointerEvents='none'>
      <PreviewWebView source={{ html }} />
    </Container>
  )
}

export default CustomBibleVersePreview