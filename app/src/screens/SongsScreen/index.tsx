import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import SearchFileTree from '../../components/Search/SearchFileTree'
import { FileTree } from '../../models/file-tree'
import { SongService } from '../../services/song'

const SongsScreen: React.FC = (props) => {
  const [songsFileTree, setSongsFileTree] = useState<FileTree | null>(null)

  useEffect(() => {
    updateSongs()
  }, [])

  async function updateSongs() {
    const songs = await SongService.getSongs()
    setSongsFileTree(songs)
  }

  function searchFileTree(selectedDirectory: FileTree, searchText: string): FileTree[] {
    return SongService.searchSongs(selectedDirectory.children, searchText)
  }

  return (
    <>
      {songsFileTree ? (
        <SearchFileTree
          rootFileTree={songsFileTree}
          searchFileTree={searchFileTree}
        />
      ) : <Loading />}
    </>
  )
}

export default SongsScreen