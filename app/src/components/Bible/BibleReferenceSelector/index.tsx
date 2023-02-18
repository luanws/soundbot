import React, { useEffect, useState } from 'react'
import { BibleReference } from '../../../models/bible'

import { Container, TitleText } from './styles'

interface Props {
  onSelectReference?(reference: BibleReference): void
}

const BibleReferenceSelector: React.FC<Props> = (props) => {
  const { onSelectReference } = props

  const [reference, setReference] = useState<BibleReference | undefined>()
  const [bookName, setBookName] = useState<string | undefined>()
  const [chapterNumber, setChapterNumber] = useState<number | undefined>()
  const [verseNumber, setVerseNumber] = useState<number | undefined>()

  useEffect(() => {
    if (reference && onSelectReference) {
      onSelectReference(reference)
    }
  }, [reference])

  useEffect(() => {
    if (bookName && chapterNumber && verseNumber) {
      setReference({ bookName, chapterNumber, verseNumber })
    }
  }, [bookName, chapterNumber, verseNumber])

  return (
    <Container>
      <TitleText>BibleReferenceSelector</TitleText>
    </Container>
  )
}

export default BibleReferenceSelector