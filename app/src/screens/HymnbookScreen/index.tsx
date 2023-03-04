import React, { useEffect, useState } from 'react'
import HymnList from '../../components/List/HymnList'
import SearchView from '../../components/Search/SearchView'
import { CommandService } from '../../services/command'
import { HymnService } from '../../services/hymn'


const HymnbookScreen: React.FC = (props) => {
  const [hymns, setHymns] = useState<string[]>([])
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
    const hymns = await HymnService.getHymns()
    setHymns(hymns)
  }

  async function handleHymnPress(hymn: string) {
    CommandService.playVideo({
      dirname: '',
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