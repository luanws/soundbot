import React from 'react'
import { FlatList } from 'react-native'
import BookCell from './BookCell'
import { Container } from './styles'

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
    <Container>
      <FlatList
        data={bookNames}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
        renderItem={({ item }) => (
          <BookCell bookName={item} onSelectBookName={handleSelectBookName} />
        )}
      />
    </Container>
  )
}

export default BookSelector