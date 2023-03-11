import React from 'react'
import { FlatList } from 'react-native'
import { FileTree } from '../../../models/file-tree'
import FolderCell from '../../Cell/FolderCell'
import VideoCell from '../../Cell/VideoCell'
import { Separator } from './styles'

interface Props {
  fileTree: FileTree | FileTree[]
  onPress?(item: FileTree): void
  ListHeaderComponent?: | React.ComponentType<any> | React.ReactElement | null | undefined
}

const FileTreeList: React.FC<Props> = (props) => {
  const { fileTree: _fileTree, onPress, ListHeaderComponent } = props
  const fileTree = Array.isArray(_fileTree) ? _fileTree : [_fileTree]

  const renderItem = (fileTree: FileTree) => {
    const { name, type } = fileTree
    if (type === 'file') return <VideoCell filename={name} onPress={() => onPress?.(fileTree)} />
    return <FolderCell directory={name} onPress={() => onPress?.(fileTree)} />
  }

  return (
    <FlatList
      data={fileTree}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(item, index) => item.dirname + item.name}
      renderItem={({ item }) => renderItem(item)}
      ItemSeparatorComponent={() => <Separator />}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  )
}

export default FileTreeList