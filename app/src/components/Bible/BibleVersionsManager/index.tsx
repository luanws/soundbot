import React, { useEffect, useState } from 'react'
import { BibleService } from '../../../services/bible'
import BibleVersion from './BibleVersion'

import { Container } from './styles'

interface Props {
}

const BibleVersionsManager: React.FC<Props> = (props) => {
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
      {availableVersionsForDownload.length > 0 ? (
        availableVersionsForDownload.map((version) => (
          <BibleVersion
            key={version}
            version={version}
            available={availableVersions.includes(version)}
            onDownloadPress={updateAvailableVersions}
            onDeletePress={updateAvailableVersions}
          />
        ))
      ) : (
        availableVersions.map((version) => (
          <BibleVersion
            key={version}
            version={version}
            available={availableVersions.includes(version)}
            onDownloadPress={updateAvailableVersions}
            onDeletePress={updateAvailableVersions}
          />
        ))
      )}
    </Container>
  )
}

export default BibleVersionsManager