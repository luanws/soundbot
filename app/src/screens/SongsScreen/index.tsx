import React, { useEffect, useRef, useState } from 'react'
import { BackHandler } from 'react-native'
import VideoCell from '../../components/Cell/VideoCell'
import GestureModal, { GestureModalRef } from '../../components/GestureModal'
import FileTreeList from '../../components/List/FileTreeList'
import Loading from '../../components/Loading'
import SearchView from '../../components/Search/SearchView'
import { FileTree } from '../../models/file-tree'
import { CommandService } from '../../services/command'
import { SongService } from '../../services/song'
import { Divider, FileTreeContainer, FileTreeCurrentPathContainer, FileTreeCurrentPathText, PlayModalContainer, PlayModalText } from './styles'

const SongsScreen: React.FC = (props) => {
  const playerModalRef = useRef<GestureModalRef>(null)

  const [rootFileTree, setRootFileTree] = useState<FileTree | null>(null)
  const [selectedFileTree, setSelectedFileTree] = useState<FileTree | null>(null)
  const [stackFileTree, setStackFileTree] = useState<FileTree[]>([])
  const [filteredFileTree, setFilteredFileTree] = useState<FileTree[] | null>(null)
  const [playingSong, setPlayingSong] = useState<string | null>(null)

  useEffect(() => {
    updateSongs()
  }, [])

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
    const filteredFileTree = SongService.searchSongs(selectedFileTree.children, searchText)
    setFilteredFileTree(filteredFileTree)
  }

  return (
    <>
      {rootFileTree && selectedFileTree ? (
        <>
          <SearchView
            data={selectedFileTree.children}
            renderList={(fileTree) => (
              <>
                <FileTreeCurrentPathContainer>
                  <FileTreeCurrentPathText>
                    {dirnameToRelativePath(rootFileTree.dirname, selectedFileTree.dirname)}
                  </FileTreeCurrentPathText>
                </FileTreeCurrentPathContainer>
                <Divider />
                <FileTreeContainer>
                  <FileTreeList
                    fileTree={filteredFileTree || fileTree}
                    onPress={handleSelectFileTree}
                  />
                </FileTreeContainer>
              </>
            )}
            onChangeText={handleSearch}
          />
        </>
      ) : <Loading />}
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

export default SongsScreen