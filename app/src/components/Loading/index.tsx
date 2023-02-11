import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Container } from './styles'

interface Props {
}

const Loading: React.FC<Props> = (props) => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#999" />
    </Container>
  )
}

export default Loading