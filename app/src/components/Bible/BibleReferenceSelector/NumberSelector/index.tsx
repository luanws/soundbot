import React from 'react'
import { FlatList } from 'react-native'
import ChapterCell from './NumberCell'
import { Container } from './styles'

interface Props {
  numbers: number[]
  columns: number
  padding: number
  onSelectNumber?(chapterNumber: number): void
}

const NumberSelector: React.FC<Props> = (props) => {
  const { numbers, onSelectNumber, columns, padding } = props

  function handleSelectNumber(chapterNumber: number) {
    if (onSelectNumber) onSelectNumber(chapterNumber)
  }

  return (
    <Container>
      <FlatList
        data={numbers}
        contentContainerStyle={{ padding }}
        keyExtractor={(item) => item.toString()}
        numColumns={columns}
        renderItem={({ item }) => (
          <ChapterCell
            number={item}
            columns={columns}
            padding={padding}
            onSelectNumber={handleSelectNumber}
          />
        )}
      />
    </Container>
  )
}

export default NumberSelector