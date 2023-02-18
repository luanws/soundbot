import React from 'react'
import { BibleReference } from '../../../models/bible'
import { BibleService } from '../../../services/bible'

import { Container, ReferenceButton, ReferenceText, VersionButton, VersionText } from './styles'

interface Props {
  onPressReference?(): void
  onPressVersion?(): void
  reference?: BibleReference
  version: string
}

const BibleBar: React.FC<Props> = (props) => {
  const { reference, version, onPressReference, onPressVersion } = props

  const referenceString = reference ? BibleService.bibleReferenceToString(reference) : 'Selecione um versículo'

  return (
    <Container>
      <ReferenceButton onPress={onPressReference}>
        <ReferenceText>{referenceString}</ReferenceText>
      </ReferenceButton>
      <VersionButton onPress={onPressVersion}>
        <VersionText>{version}</VersionText>
      </VersionButton>
    </Container>
  )
}

export default BibleBar