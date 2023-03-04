import React, { useEffect, useState } from 'react'
import HymnCell from '../../components/Cell/HymnCell'
import { CommandService } from '../../services/command'
import { HymnService } from '../../services/hymn'
import { Scroll } from '../HomeScreen/styles'
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
    CommandService.playVideo({ dirname: '', filename: hymn })
  }

  return (
    <Container>
      <Scroll>
        {hymns.map((hymn) => (
          <HymnCell key={hymn} hymn={hymn} onPress={handleHymnPress} />
        ))}
      </Scroll>
    </Container>
  )
}

export default HymnbookScreen