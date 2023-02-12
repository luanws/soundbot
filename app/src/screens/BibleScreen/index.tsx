import React from 'react'
import BibleVersionsManager from '../../components/Bible/BibleVersionsManager'
import { Container } from './styles'

interface Props {
}

const BibleScreen: React.FC<Props> = (props) => {
  return (
    <Container>
      <BibleVersionsManager />
    </Container>
  )
}

export default BibleScreen