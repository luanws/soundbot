import React from 'react'
import CustomBibleVersePreview from '../../components/Bible/CustomBibleVersePreview'
import { Container } from './styles'

const BibleVerseDisplaySettingsScreen: React.FC = () => {
  return (
    <Container>
      <CustomBibleVersePreview
        bibleVerse={{
          text: 'Este é um texto fictício para testar a visualização customizada de versículos bíblicos.',
          reference: {
            bookName: 'Livro',
            chapterNumber: 0,
            verseNumber: 0
          }
        }}
      />
    </Container>
  )
}

export default BibleVerseDisplaySettingsScreen