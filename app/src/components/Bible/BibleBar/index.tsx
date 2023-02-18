import React from 'react'

import { Container, ReferenceButton, ReferenceText, VersionButton, VersionText } from './styles'

interface Props {
  onPressReference?(): void
  onPressVersion?(): void
  text: string
  version: string
}

const BibleBar: React.FC<Props> = (props) => {
  const { text, version, onPressReference, onPressVersion } = props

  return (
    <Container>
      <ReferenceButton onPress={onPressReference}>
        <ReferenceText>{text}</ReferenceText>
      </ReferenceButton>
      <VersionButton onPress={onPressVersion}>
        <VersionText>{version}</VersionText>
      </VersionButton>
    </Container>
  )
}

export default BibleBar