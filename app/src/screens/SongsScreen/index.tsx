import React, { useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { FileTree } from '../../models/file-tree'
import { SongService } from '../../services/song'

const SongsScreen: React.FC = (props) => {
  const [songs, setSongs] = useState<FileTree | null>(null)

  useEffect(() => {
    updateSongs()
  }, [])

  async function updateSongs() {
    const songs = await SongService.getSongs()
    setSongs(songs)
  }

  return (
    <ScrollView>
      <Text>{JSON.stringify(songs, null, 2)}</Text>
    </ScrollView>
  )
}

export default SongsScreen