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
}

const allBookNames = BibleService.getAllBookNames()
const chapterNumbers = range(1, 5000)
const verseNumbers = range(1, 5000)

function range(start: number, end: number): number[] {
  return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
}

const BibleReferenceSelector: React.FC<Props> = (props) => {
  const { onSelectReference } = props

  const layout = useWindowDimensions()
  const theme = useTheme()

  const [bookName, setBookName] = useState<string | undefined>()
  const [chapterNumber, setChapterNumber] = useState<number | undefined>()
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [routes] = useState([
    { key: 'book', title: 'Livro' },
    { key: 'chapter', title: 'Capítulo' },
    { key: 'verse', title: 'Versículo' }
  ])

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
            columns={3}
            padding={8}
            onSelectNumber={handleSelectChapterNumber}
          />
        ),
        verse: () => (
          <NumberSelector
            numbers={verseNumbers}
            columns={3}
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