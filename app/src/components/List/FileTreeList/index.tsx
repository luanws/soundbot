import React from 'react'
import { FlatList } from 'react-native'
import { FileTree } from '../../../models/file-tree'
import FolderCell from '../../Cell/FolderCell'
import VideoCell from '../../Cell/VideoCell'
import { Separator } from './styles'

interface Props {
  fileTree: FileTree | FileTree[]
  onPress?(item: FileTree): void
}

const FileTreeList: React.FC<Props> = (props) => {
  const { fileTree: _fileTree } = props
  const fileTree = Array.isArray(_fileTree) ? _fileTree : [_fileTree]

  const renderItem = (fileTree: FileTree) => {
    const { name, type } = fileTree
    if (type === 'file') return <VideoCell filename={name} />
    return <FolderCell directory={name} />
  }

  return (
    <FlatList
      data={fileTree}
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