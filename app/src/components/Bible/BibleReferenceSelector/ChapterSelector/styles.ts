import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styled } from "../../../../hooks/theme"

const windowWidth = Dimensions.get('window').width
const containerPadding = 8
const numberOfColumns = 5
const chapterNumberButtonSize = (windowWidth - containerPadding * 2) / numberOfColumns

export const Scroll = styled(ScrollView)`
`

export const Container = styled(View)`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: ${containerPadding}px;
`

export const ChapterNumberButton = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.containerBackground};
    width: ${chapterNumberButtonSize}px;
    height: ${chapterNumberButtonSize}px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border-color: ${({ theme }) => theme.colors.background};
    border-width: 2px;
`

export const ChapterNumberText = styled(Text)`
    color: ${props => props.theme.colors.text1};
    font-size: 16px;
`