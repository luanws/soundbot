import React from 'react'

import { Container, ReferenceButton, ReferenceText, VersionButton, VersionText } from './styles'

interface Props {
}

const BibleBar: React.FC<Props> = (props) => {
  return (
    <Container>
      <ReferenceButton>
        <ReferenceText>João 3:16</ReferenceText>
      </ReferenceButton>
      <VersionButton>
        <VersionText>ARA</VersionText>
      </VersionButton>
    </Container>
  )
}

export default BibleBar