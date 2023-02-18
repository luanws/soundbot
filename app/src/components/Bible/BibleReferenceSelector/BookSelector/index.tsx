import React from 'react'
import { BookNameButton, BookNameText, Container, Scroll } from './styles'

interface Props {
  bookNames: string[]
  onSelectBookName?(bookName: string): void
}

const BookSelector: React.FC<Props> = (props) => {
  const { bookNames, onSelectBookName } = props

  function handleSelectBookName(bookName: string) {
    if (onSelectBookName) onSelectBookName(bookName)
  }

  return (
    <Scroll>
      <Container>
        {bookNames.map((bookName) => (
          <BookNameButton key={bookName} onPress={() => handleSelectBookName(bookName)}>
            <BookNameText>{bookName}</BookNameText>
          </BookNameButton>
        ))}
      </Container>
    </Scroll>
  )
}

export default BookSelector