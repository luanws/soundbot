import React, { useEffect, useRef, useState } from 'react'
import { BackHandler } from 'react-native'
import VideoCell from '../../../components/Cell/VideoCell'
import GestureModal, { GestureModalRef } from '../../../components/GestureModal'
import FileTreeList from '../../../components/List/FileTreeList'
import SearchView from '../../../components/Search/SearchView'
import { FileTree } from '../../../models/file-tree'
import { CommandService } from '../../../services/command'
import {
  Divider, FileTreeContainer, FileTreeCurrentPathContainer,
  FileTreeCurrentPathScroll, FileTreeCurrentPathText, PlayModalContainer, PlayModalText
} from './styles'


interface Props {
  rootFileTree: FileTree
  searchFileTree(selectedDirectory: FileTree, searchText: string): FileTree[]
  ListHeaderComponent?: | React.ComponentType<any> | React.ReactElement | null | undefined
}

const SearchFileTree: React.FC<Props> = (props) => {
  const { rootFileTree, searchFileTree: filterFileTree, ListHeaderComponent } = props

  const playerModalRef = useRef<GestureModalRef>(null)

  const [selectedFileTree, setSelectedFileTree] = useState<FileTree>(rootFileTree)
  const [stackFileTree, setStackFileTree] = useState<FileTree[]>([])
  const [filteredFileTree, setFilteredFileTree] = useState<FileTree[] | null>(null)
  const [playingSong, setPlayingSong] = useState<string | null>(null)

  useEffect(() => {
    if (playingSong) playerModalRef.current?.open()
    else playerModalRef.current?.close()
  }, [playingSong])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (selectedFileTree && rootFileTree && selectedFileTree.dirname !== rootFileTree.dirname) {
        const stack = [...stackFileTree]
        const fileTree = stack.pop()
        if (fileTree) {
          setSelectedFileTree(fileTree)
          setStackFileTree(stack)
        }
        return true
      }
      return false
    })
    return () => backHandler.remove()
  }, [selectedFileTree, rootFileTree, stackFileTree])

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
      setPlayingSong(fileTree.name)
    }
  }

  async function handleStopSong() {
    await CommandService.stopVideo()
    setPlayingSong(null)
  }

  async function handleSearch(searchText: string) {
    if (!selectedFileTree) return
    if (!searchText) return setFilteredFileTree(null)
    const filteredFileTree = filterFileTree(selectedFileTree, searchText)
    setFilteredFileTree(filteredFileTree)
  }

  return (
    <>
      <SearchView
        data={selectedFileTree.children}
        renderList={(fileTree) => (
          <>
            <FileTreeCurrentPathContainer>
              <FileTreeCurrentPathScroll
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <FileTreeCurrentPathText>
                  {dirnameToRelativePath(rootFileTree.dirname, selectedFileTree.dirname)}
                </FileTreeCurrentPathText>
              </FileTreeCurrentPathScroll>
            </FileTreeCurrentPathContainer>
            <Divider />
            <FileTreeContainer>
              <FileTreeList
                ListHeaderComponent={ListHeaderComponent}
                fileTree={filteredFileTree || fileTree}
                onPress={handleSelectFileTree}
              />
            </FileTreeContainer>
          </>
        )}
        onChangeText={handleSearch}
      />
      <GestureModal
        ref={playerModalRef}
        onClose={handleStopSong}
        closeOnOverlayTap={false}
        onBackButtonPress={() => true}
        panGestureEnabled={false}
        withHandle={false}
      >
        {playingSong && (
          <PlayModalContainer>
            <PlayModalText>Reproduzindo</PlayModalText>
            <VideoCell filename={playingSong} playing onPress={handleStopSong} />
          </PlayModalContainer>
        )}
      </GestureModal>
    </>
  )
}

export default SearchFileTree