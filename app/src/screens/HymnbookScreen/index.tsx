import React, { useEffect, useState } from 'react'
import HymnList from '../../components/List/HymnList'
import SearchView from '../../components/Search/SearchView'
import { CommandService } from '../../services/command'
import { HymnService } from '../../services/hymn'


const HymnbookScreen: React.FC = (props) => {
  const [hymns, setHymns] = useState<string[]>([])
  const [hymnsDirname, setHymnsDirname] = useState<string>('')
  const [filteredHymns, setFilteredHymns] = useState<string[]>([])
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    updateHymns()
  }, [])

  useEffect(() => {
    setFilteredHymns(filterHymns(hymns, searchText))
  }, [hymns, searchText])

  function filterHymns(hymns: string[], searchText: string): string[] {
    return hymns.filter((hymn) => {
      return hymn.like(searchText)
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
  }

  return (
    <SearchView
      data={hymns}
      renderList={(hymns) => <HymnList hymns={filteredHymns} onPress={handleHymnPress} />}
      searchText={searchText}
      onChangeText={setSearchText}
      onClear={() => setSearchText('')}
    />
  )
}

export default HymnbookScreen