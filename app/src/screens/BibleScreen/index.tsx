import React from 'react'
import BibleBar from '../../components/Bible/BibleBar'
import BibleVersionsManager from '../../components/Bible/BibleVersionsManager'
import { Container } from './styles'

interface Props {
}

const BibleScreen: React.FC<Props> = (props) => {
  return (
    <Container>
      <BibleBar />
      <BibleVersionsManager />
    </Container>
  )
}

export default BibleScreen