import Slider from '@react-native-community/slider'
import React from 'react'
import { useTheme } from '../../../hooks/theme'
import { Container, LabelText, TextsContainer, ValueText } from './styles'

interface Props {
  label?: string
  value: number
  onValueChange(value: number): void
  formatValue?(value: number): string
  minimumValue: number
  maximumValue: number
  step: number
}

const SliderInput: React.FC<Props> = (props) => {
  const { label, value, onValueChange, formatValue, minimumValue, maximumValue, step } = props

  const theme = useTheme()

  return (
    <Container>
      <TextsContainer>
        {label !== undefined && <LabelText>{label}</LabelText>}
        {formatValue && <ValueText>{formatValue(value)}</ValueText>}
      </TextsContainer>
      <Slider
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        thumbTintColor={theme.colors.primary}
        minimumTrackTintColor={theme.colors.primary}
        onValueChange={onValueChange}
      />
    </Container>
  )
}

export default SliderInput