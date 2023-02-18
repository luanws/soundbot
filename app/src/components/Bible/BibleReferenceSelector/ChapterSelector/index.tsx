import React from 'react'
import { ChapterNumberButton, ChapterNumberText, Container, Scroll } from './styles'

interface Props {
  chapterNumbers: number[]
  onSelectChapterNumber?(chapterNumber: number): void
}

const ChapterSelector: React.FC<Props> = (props) => {
  const { chapterNumbers, onSelectChapterNumber } = props

  function handleSelectChapterNumber(chapterNumber: number) {
    if (onSelectChapterNumber) onSelectChapterNumber(chapterNumber)
  }

  return (
    <Scroll>
      <Container>
        {chapterNumbers.map((chapterNumber) => (
          <ChapterNumberButton key={chapterNumber} onPress={() => handleSelectChapterNumber(chapterNumber)}>
            <ChapterNumberText>{chapterNumber}</ChapterNumberText>
          </ChapterNumberButton>
        ))}
      </Container>
    </Scroll>
  )
}

export default ChapterSelector