import React, { memo } from 'react'
import { Dimensions } from 'react-native'
import { NumberButton, NumberText } from './styles'

interface Props {
  number: number
  columns: number
  padding: number
  onSelectNumber?(number: number): void
}

const NumberCell: React.FC<Props> = (props) => {
  const { number, onSelectNumber, columns, padding } = props

  const windowWidth = Dimensions.get('window').width
  const numberButtonSize = (windowWidth - padding * 2) / columns

  return (
    <NumberButton
      onPress={() => onSelectNumber && onSelectNumber(number)}
      style={{ width: numberButtonSize, height: numberButtonSize }}
    >
      <NumberText>{number}</NumberText>
    </NumberButton>
  )
}

export default memo(NumberCell)