import React, { useState } from 'react'
import SearchView from '../../../Search/SearchView'
import BookSelectorList from './List'
import { Container } from './styles'

interface Props {
  bookNames: string[]
  onSelectBookName?(bookName: string): void
}

const BookSelector: React.FC<Props> = (props) => {
  const { bookNames, onSelectBookName } = props

  const [filteredBookNames, setFilteredBookNames] = useState<string[]>(bookNames)

  function filterBookNames(searchText: string) {
    const filteredBookNames = bookNames.filter((bookName) => {
      return bookName.like(searchText)
    })
    setFilteredBookNames(filteredBookNames)
  }

  return (
    <Container>
      <SearchView
        data={filteredBookNames}
        renderList={(filteredBookNames) => (
          <BookSelectorList
            bookNames={filteredBookNames}
            onSelectBookName={onSelectBookName}
          />
        )}
        onSearch={filterBookNames}
        onClear={() => filterBookNames('')}
      />
    </Container>
  )
}

export default BookSelector