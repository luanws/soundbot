import React from 'react'
import { BibleReference, BibleVerse } from '../../../models/bible'
import { BibleVerseHTMLStyleProps } from '../../../models/bible-verse-html'
import { BibleService } from '../../../services/bible'
import { BibleVerseHTMLService } from '../../../services/bible-verse-html'
import { Container, PreviewWebView } from './styles'


interface Props {
  bibleVerse: BibleVerse
  bibleVerseHTMLStyleProps?: BibleVerseHTMLStyleProps
}

const BibleVerseHTMLPreview: React.FC<Props> = (props) => {
  const { bibleVerse, bibleVerseHTMLStyleProps } = props
  const { text, reference } = bibleVerse
  
  const html = BibleVerseHTMLService.makeBibleVerseHTML(
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

export default BibleVerseHTMLPreview