import React from 'react'
import { BibleService } from '../../../../services/bible'

import {
  Container, DeleteButton, DeleteButtonIcon, DownloadButton, DownloadButtonIcon, DownloadButtonText,
  DownloadedButtonText, DownloadedContainer, DownloadedIcon, VersionNameText
} from './styles'

interface Props {
  version: string
  available: boolean
  onDownloadPress?: (version: string) => void
  onDeletePress?: (version: string) => void
}

const BibleVersion: React.FC<Props> = (props) => {
  const { version, available, onDownloadPress, onDeletePress } = props

  async function handleDownload() {
    await BibleService.downloadVersion(version)
    if (onDownloadPress) onDownloadPress(version)
  }

  async function handleDelete() {
    await BibleService.deleteVersion(version)
    if (onDeletePress) onDeletePress(version)
  }

  return (
    <Container>
      <VersionNameText>{version}</VersionNameText>
      {available ? (
        <DownloadedContainer>
          <DownloadedButtonText>Baixado</DownloadedButtonText>
          <DownloadedIcon name="check" />
          <DeleteButton onPress={handleDelete}>
            <DeleteButtonIcon name="delete" />
          </DeleteButton>
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