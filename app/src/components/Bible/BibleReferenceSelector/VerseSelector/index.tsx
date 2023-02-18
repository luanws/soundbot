import React from 'react'
import { Container, Scroll, VerseNumberButton, VerseNumberText } from './styles'

interface Props {
  verseNumbers: number[]
  onSelectVerseNumber?(verseNumber: number): void
}

const VerseSelector: React.FC<Props> = (props) => {
  const { verseNumbers, onSelectVerseNumber } = props

  function handleSelectVerseNumber(verseNumber: number) {
    if (onSelectVerseNumber) onSelectVerseNumber(verseNumber)
  }

  return (
    <Scroll>
      <Container>
        {verseNumbers.map((verseNumber) => (
          <VerseNumberButton key={verseNumber} onPress={() => handleSelectVerseNumber(verseNumber)}>
            <VerseNumberText>{verseNumber}</VerseNumberText>
          </VerseNumberButton>
        ))}
      </Container>
    </Scroll>
  )
}

export default VerseSelector