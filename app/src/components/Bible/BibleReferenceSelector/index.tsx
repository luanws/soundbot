import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabBar } from 'react-native-tab-view'
import { useTheme } from '../../../hooks/theme'
import { BibleReference } from '../../../models/bible'
import { BibleService } from '../../../services/bible'
import BookSelector from './BookSelector'
import NumberSelector from './NumberSelector'
import { TabViewStyled } from './styles'


interface Props {
  onSelectReference?(reference: BibleReference): void
  bibleVersion: string
}

const allBookNames = BibleService.getAllBookNames()

const BibleReferenceSelector: React.FC<Props> = (props) => {
  const { onSelectReference, bibleVersion } = props

  const layout = useWindowDimensions()
  const theme = useTheme()

  const [bookName, setBookName] = useState<string | undefined>()
  const [chapterNumber, setChapterNumber] = useState<number | undefined>()
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [chapterNumbers, setChapterNumbers] = useState<number[]>([])
  const [verseNumbers, setVerseNumbers] = useState<number[]>([])
  const [routes] = useState([
    { key: 'book', title: 'Livro' },
    { key: 'chapter', title: 'Capítulo' },
    { key: 'verse', title: 'Versículo' }
  ])

  async function handleSelectBookName(bookName: string) {
    setTabIndex(1)
    setBookName(bookName)
    const chapterNumbers = await BibleService.getChapterNumbersFromBook(bibleVersion, bookName)
    setChapterNumbers(chapterNumbers)
  }

  async function handleSelectChapterNumber(chapterNumber: number) {
    if (!bookName) {
      setTabIndex(0)
      return
    }
    setTabIndex(2)
    setChapterNumber(chapterNumber)
    const verseNumbers = await BibleService.getVerseNumbersFromChapter(bibleVersion, bookName, chapterNumber)
    setVerseNumbers(verseNumbers)
  }

  function handleSelectVerseNumber(verseNumber: number) {
    if (bookName && chapterNumber && verseNumber) {
      const reference: BibleReference = { bookName, chapterNumber, verseNumber }
      if (onSelectReference) onSelectReference(reference)
    }
  }

  return (
    <TabViewStyled
      lazy={false}
      navigationState={{ index: tabIndex, routes }}
      onIndexChange={setTabIndex}
      initialLayout={{ width: layout.width }}
      renderScene={SceneMap({
        book: () => (
          <BookSelector
            bookNames={allBookNames}
            onSelectBookName={handleSelectBookName}
          />
        ),
        chapter: () => (
          <NumberSelector
            numbers={chapterNumbers}
            columns={4}
            padding={8}
            onSelectNumber={handleSelectChapterNumber}
          />
        ),
        verse: () => (
          <NumberSelector
            numbers={verseNumbers}
            columns={4}
            padding={8}
            onSelectNumber={handleSelectVerseNumber}
          />
        ),
      })}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: theme.colors.primary }}
          pressColor={theme.colors.primaryDark}
          activeColor={theme.colors.text1}
          inactiveColor={theme.colors.text2}
          indicatorStyle={{ backgroundColor: theme.colors.text1 }}
          labelStyle={{ fontWeight: 'bold' }}
        />
      )}
    />
  )
}

export default BibleReferenceSelector