import React from 'react'
import { BibleService } from '../../../../services/bible'

import {
  Container, DeleteButton, DeleteButtonIcon, DownloadButton, DownloadButtonIcon, DownloadButtonText, DownloadedContainer, SelectedButtonText, SelectedIcon, VersionNameText
} from './styles'

interface Props {
  version: string
  available: boolean
  selected?: boolean
  onDownloadPress?(version: string): void
  onDeletePress?(version: string): void
  onVersionSelect?(version: string): void
}

const BibleVersion: React.FC<Props> = (props) => {
  const { version, available, onDownloadPress, onDeletePress, onVersionSelect, selected } = props

  async function handleDownload() {
    await BibleService.downloadVersion(version)
    if (onDownloadPress) onDownloadPress(version)
  }

  async function handleDelete() {
    await BibleService.deleteVersion(version)
    if (onDeletePress) onDeletePress(version)
  }

  function handleSelect() {
    if (onVersionSelect) onVersionSelect(version)
  }

  return (
    <Container
      onPress={handleSelect}
      activeOpacity={available ? 0.7 : 1}
    >
      <VersionNameText>{version}</VersionNameText>
      {available ? (
        <DownloadedContainer>
          {selected && (
            <>
              <SelectedIcon name="check" />
              <SelectedButtonText>Selecionado</SelectedButtonText>
            </>
          )}
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