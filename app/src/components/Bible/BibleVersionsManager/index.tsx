import React, { useEffect, useState } from 'react'
import { BibleService } from '../../../services/bible'
import BibleVersion from './BibleVersion'

import { BibleVersionsContainer, Container, TitleText } from './styles'

interface Props {
  selectedVersion?: string
  onVersionSelect?(version: string): void
}

const BibleVersionsManager: React.FC<Props> = (props) => {
  const { selectedVersion, onVersionSelect } = props

  const [availableVersionsForDownload, setAvailableVersionsForDownload] = useState<string[]>([])
  const [availableVersions, setAvailableVersions] = useState<string[]>([])

  useEffect(() => {
    BibleService.getAvailableVersionsForDownload().then(setAvailableVersionsForDownload)
    updateAvailableVersions()
  }, [])

  function updateAvailableVersions() {
    BibleService.getAvailableVersions().then(setAvailableVersions)
  }

  return (
    <Container>
      <TitleText>Disponíveis</TitleText>
      <BibleVersionsContainer>
        {availableVersions.map((version) => (
          <BibleVersion
            key={version}
            selected={version === selectedVersion}
            onVersionSelect={onVersionSelect}
            version={version}
            available={availableVersions.includes(version)}
            onDownloadPress={updateAvailableVersions}
            onDeletePress={updateAvailableVersions}
          />
        ))}
      </BibleVersionsContainer>
      <TitleText>Disponíveis para download</TitleText>
      <BibleVersionsContainer>
        {availableVersionsForDownload.filter((version) => !availableVersions.includes(version)).map((version) => (
          <BibleVersion
            key={version}
            version={version}
            available={availableVersions.includes(version)}
            onDownloadPress={updateAvailableVersions}
            onDeletePress={updateAvailableVersions}
          />
        ))}
      </BibleVersionsContainer>
    </Container>
  )
}

export default BibleVersionsManager