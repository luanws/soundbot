import React, { useEffect, useState } from 'react'
import FileTreeList from '../../components/List/FileTreeList'
import { FileTree } from '../../models/file-tree'
import { SongService } from '../../services/song'

const SongsScreen: React.FC = (props) => {
  const [songs, setSongs] = useState<FileTree | null>(null)
  const [selectedFileTree, setSelectedFileTree] = useState<FileTree | null>(null)

  useEffect(() => {
    updateSongs()
  }, [])

  async function updateSongs() {
    const songs = await SongService.getSongs()
    setSongs(songs)
  }

  return (
    <>
      {songs && (
        <FileTreeList
          fileTree={songs.children}
          onPress={setSelectedFileTree}
        />
      )}
    </>
  )
}

export default SongsScreen