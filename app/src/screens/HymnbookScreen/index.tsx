import React, { useEffect, useRef, useState } from 'react'
import HymnCell from '../../components/Cell/HymnCell'
import HymnList from '../../components/List/HymnList'
import Loading from '../../components/Loading'
import PlayerModal, { PlayerModalRef } from '../../components/Modal/PlayerModal'
import SearchView from '../../components/Search/SearchView'
import { CommandService } from '../../services/command'
import { HymnService } from '../../services/hymn'


const HymnbookScreen: React.FC = (props) => {
  const playerModalRef = useRef<PlayerModalRef>(null)

  const [hymns, setHymns] = useState<string[]>([])
  const [playingHymn, setPlayingHymn] = useState<string | null>(null)
  const [hymnsDirname, setHymnsDirname] = useState<string>('')
  const [filteredHymns, setFilteredHymns] = useState<string[]>([])
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    updateHymns()
  }, [])

  useEffect(() => {
    setFilteredHymns(filterHymns(hymns, searchText))
  }, [hymns, searchText])

  useEffect(() => {
    if (playingHymn) playerModalRef.current?.open()
    else playerModalRef.current?.close()
  }, [playingHymn])

  function filterHymns(hymns: string[], searchText: string): string[] {
    return hymns.filter((hymn) => {
      return hymn.includesLike(searchText)
    })
  }

  async function updateHymns() {
    const { dirname, filenames } = await HymnService.getHymns()
    const hymns = filenames
    setHymns(hymns)
    setHymnsDirname(dirname)
  }

  async function handleHymnPress(hymn: string) {
    await CommandService.playVideo({
      dirname: hymnsDirname,
      filename: hymn
    })
    setPlayingHymn(hymn)
  }

  async function handleStopHymn() {
    await CommandService.stopVideo()
    setPlayingHymn(null)
  }

  return (
    <>
      {hymns.length ? (
        <SearchView
          data={filteredHymns}
          renderList={(filteredHymns) => <HymnList hymns={filteredHymns} onPress={handleHymnPress} />}
          searchText={searchText}
          onChangeText={setSearchText}
          onClear={() => setSearchText('')}
        />
      ) : <Loading />}
      <PlayerModal
        ref={playerModalRef}
        playingVideoFilename={playingHymn}
        stopVideo={handleStopHymn}
        renderVideoCell={(filename) => <HymnCell hymn={filename} playing onPress={handleStopHymn} />}
      />
    </>
  )
}

export default HymnbookScreen