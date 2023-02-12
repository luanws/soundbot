import React from 'react'
import { BibleService } from '../../../services/bible'

import { Container, DownloadButton, DownloadButtonIcon, DownloadButtonText, DownloadedButtonText, DownloadedContainer, DownloadedIcon, VersionNameText } from './styles'

interface Props {
  version: string
  available: boolean
  onDownloadPress?: (version: string) => void
}

const BibleVersion: React.FC<Props> = (props) => {
  const { version, available, onDownloadPress } = props

  async function handleDownload() {
    await BibleService.downloadVersion(version)
    if (onDownloadPress) onDownloadPress(version)
  }

  return (
    <Container>
      <VersionNameText>{version}</VersionNameText>
      {available ? (
        <DownloadedContainer>
          <DownloadedButtonText>Baixado</DownloadedButtonText>
          <DownloadedIcon name="check" />
        </DownloadedContainer>
      ) : (
        <DownloadButton onPress={handleDownload}>
          <DownloadButtonText>Baixar</DownloadButtonText>
          <DownloadButtonIcon name="download" />
        </DownloadButton>
      )}
    </Container>
  )
}

export default BibleVersion