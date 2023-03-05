import React, { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import FileTreeList from '../../components/List/FileTreeList'
import { FileTree } from '../../models/file-tree'
import { CommandService } from '../../services/command'
import { SongService } from '../../services/song'
import { Container, Divider, FileTreeContainer, FileTreeCurrentPathContainer, FileTreeCurrentPathText } from './styles'

const SongsScreen: React.FC = (props) => {
  const [rootFileTree, setRootFileTree] = useState<FileTree | null>(null)
  const [selectedFileTree, setSelectedFileTree] = useState<FileTree | null>(null)
  const [stackFileTree, setStackFileTree] = useState<FileTree[]>([])

  useEffect(() => {
    updateSongs()
  }, [])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (selectedFileTree && rootFileTree && selectedFileTree.dirname !== rootFileTree.dirname) {
        const stack = [...stackFileTree]
        const fileTree = stack.pop()
        if (fileTree) {
          console.log(fileTree.dirname + '\\' + fileTree.name)
          setSelectedFileTree(fileTree)
          setStackFileTree(stack)
        }
        return true
      }
      return false
    })
    return () => backHandler.remove()
  }, [selectedFileTree, rootFileTree, stackFileTree])

  async function updateSongs() {
    const songs = await SongService.getSongs()
    setRootFileTree(songs)
    setSelectedFileTree(songs)
  }

  function dirnameToRelativePath(rootDirname: string, dirname: string): string {
    return dirname.replace(rootDirname, '').replaceAll('\\', '/') || '/'
  }

  async function handleSelectFileTree(fileTree: FileTree) {
    if (fileTree.type === 'directory') {
      setStackFileTree([...stackFileTree, selectedFileTree!])
      setSelectedFileTree(fileTree)
    } else {
      await CommandService.playVideo({
        dirname: fileTree.dirname,
        filename: fileTree.name,
      })
    }
  }

  return (
    <Container>
      {rootFileTree && selectedFileTree && (
        <>
          <FileTreeCurrentPathContainer>
            <FileTreeCurrentPathText>
              {dirnameToRelativePath(rootFileTree.dirname, selectedFileTree.dirname)}
            </FileTreeCurrentPathText>
          </FileTreeCurrentPathContainer>
          <Divider />
          <FileTreeContainer>
            <FileTreeList
              fileTree={selectedFileTree.children}
              onPress={handleSelectFileTree}
            />
          </FileTreeContainer>
        </>
      )}
    </Container>
  )
}

export default SongsScreen