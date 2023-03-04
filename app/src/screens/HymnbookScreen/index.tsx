import React, { useEffect, useState } from 'react'
import HymnList from '../../components/List/HymnList'
import { CommandService } from '../../services/command'
import { HymnService } from '../../services/hymn'
import { Container } from './styles'


const HymnbookScreen: React.FC = (props) => {
  const [hymns, setHymns] = useState<string[]>([])

  useEffect(() => {
    updateHymns()
  }, [])

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
    <Container>
      <HymnList
        hymns={hymns}
        onPress={handleHymnPress}
      />
    </Container>
  )
}

export default HymnbookScreen