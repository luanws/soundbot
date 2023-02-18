import React from 'react'

import { Container, ReferenceButton, ReferenceText, VersionButton, VersionText } from './styles'

interface Props {
  onPressReference?(): void
  onPressVersion?(): void
}

const BibleBar: React.FC<Props> = (props) => {
  const { onPressReference, onPressVersion } = props

  return (
    <Container>
      <ReferenceButton onPress={onPressReference}>
        <ReferenceText>João 3:16</ReferenceText>
      </ReferenceButton>
      <VersionButton onPress={onPressVersion}>
        <VersionText>ARA</VersionText>
      </VersionButton>
    </Container>
  )
}

export default BibleBar