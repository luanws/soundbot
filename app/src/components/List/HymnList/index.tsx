import React from 'react'
import { FlatList } from 'react-native'
import HymnCell from '../../Cell/HymnCell'
import { Separator } from './styles'

interface Props {
  hymns: string[]
  onPress?(hymn: string): void
}

const HymnList: React.FC<Props> = (props) => {
  const { hymns, onPress } = props

  const renderItem = (hymn: string) => {
    return (
      <HymnCell
        hymn={hymn}
        onPress={onPress}
      />
    )
  }

  return (
    <FlatList
      data={hymns}
      keyExtractor={(item, index) => item}
      renderItem={({ item }) => renderItem(item)}
      ItemSeparatorComponent={() => <Separator />}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  )
}

export default HymnList