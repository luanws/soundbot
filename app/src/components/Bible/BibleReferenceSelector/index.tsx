import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap } from 'react-native-tab-view'
import { BibleReference } from '../../../models/bible'
import BookSelector from './BookSelector'
import ChapterSelector from './ChapterSelector'
import { TabViewStyled } from './styles'
import VerseSelector from './VerseSelector'

interface Props {
  onSelectReference?(reference: BibleReference): void
}


const BibleReferenceSelector: React.FC<Props> = (props) => {
  const { onSelectReference } = props

  const layout = useWindowDimensions()

  const [bookName, setBookName] = useState<string | undefined>()
  const [chapterNumber, setChapterNumber] = useState<number | undefined>()
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [routes] = useState([
    { key: 'book', title: 'Livro' },
    { key: 'chapter', title: 'Capítulo' },
    { key: 'verse', title: 'Versículo' }
  ])

  const allBookNames = [
    'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio',
    'Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel',
    '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras',
    'Neemias', 'Ester', 'Jó', 'Salmos', 'Provérbios', 'Eclesiastes',
    'Cânticos dos Cânticos', 'Isaías', 'Jeremias', 'Lamentações de Jeremias',
    'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós', 'Obadias', 'Jonas',
    'Miquéias', 'Naum', 'Habacuque', 'Sofonias', 'Ageu', 'Zacarias',
    'Malaquias', 'Mateus', 'Marcos', 'Lucas', 'João', 'Atos dos Apóstolos',
    'Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas', 'Efésios',
    'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses',
    '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', '1 Pedro',
    '2 Pedro', '1 João', '2 João', '3 João', 'Judas', 'Apocalipse'
  ]

  const chapterNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
    111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
    121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
    131, 132, 133, 134, 135, 136, 137, 138, 139, 140,
    141, 142, 143, 144, 145, 146, 147, 148, 149, 150,
    151, 152, 153
  ]

  const verseNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
    111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
    121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
    131, 132, 133, 134, 135, 136, 137, 138, 139, 140,
    141, 142, 143, 144, 145, 146, 147, 148, 149, 150,
    151, 152
  ]

  function handleSelectBookName(bookName: string) {
    setBookName(bookName)
    setTabIndex(1)
  }

  function handleSelectChapterNumber(chapterNumber: number) {
    setChapterNumber(chapterNumber)
    setTabIndex(2)
  }

  function handleSelectVerseNumber(verseNumber: number) {
    if (bookName && chapterNumber && verseNumber) {
      const reference: BibleReference = { bookName, chapterNumber, verseNumber }
      if (onSelectReference) onSelectReference(reference)
    }
  }

  return (
    <TabViewStyled
      navigationState={{ index: tabIndex, routes }}
      renderScene={SceneMap({
        book: () => (
          <BookSelector
            bookNames={allBookNames}
            onSelectBookName={handleSelectBookName}
          />
        ),
        chapter: () => (
          <ChapterSelector
            chapterNumbers={chapterNumbers}
            onSelectChapterNumber={handleSelectChapterNumber}
          />
        ),
        verse: () => (
          <VerseSelector
            verseNumbers={verseNumbers}
            onSelectVerseNumber={handleSelectVerseNumber}
          />
        ),
      })}
      onIndexChange={setTabIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export default BibleReferenceSelector