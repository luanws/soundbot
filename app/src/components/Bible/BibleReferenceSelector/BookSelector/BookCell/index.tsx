import React, { memo } from 'react'
import { BookNameButton, BookNameText } from './styles'

interface Props {
  bookName: string
  onSelectBookName?(bookName: string): void
}

const BookCell: React.FC<Props> = (props) => {
  const { bookName, onSelectBookName } = props
  return (
    <BookNameButton key={bookName} onPress={() => onSelectBookName && onSelectBookName(bookName)}>
      <BookNameText>{bookName}</BookNameText>
    </BookNameButton>
  )
}

export default memo(BookCell)