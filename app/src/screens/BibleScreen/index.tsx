import React, { useEffect, useState } from 'react'
import { BibleService } from '../../services/bible'
import BibleVersion from './BibleVersion'
import { Container } from './styles'

interface Props {
}

const BibleScreen: React.FC<Props> = (props) => {
  const [availableVersionsForDownload, setAvailableVersionsForDownload] = useState<string[]>([])
  const [availableVersions, setAvailableVersions] = useState<string[]>([])

  useEffect(() => {
    BibleService.getAvailableVersionsForDownload().then(setAvailableVersionsForDownload)
    BibleService.getAvailableVersions().then(setAvailableVersions)
  }, [])

  function handleDownload(version: string) {
    BibleService.getAvailableVersions().then(setAvailableVersions)
  }

  return (
    <Container>
      {availableVersionsForDownload.length > 0 ? (
        availableVersionsForDownload.map((version) => (
          <BibleVersion
            key={version}
            version={version}
            available={availableVersions.includes(version)}
            onDownloadPress={handleDownload}
          />
        ))
      ) : (
        availableVersions.map((version) => (
          <BibleVersion
            key={version}
            version={version}
            available={availableVersions.includes(version)}
            onDownloadPress={handleDownload}
          />
        ))
      )}
    </Container>
  )
}

export default BibleScreen