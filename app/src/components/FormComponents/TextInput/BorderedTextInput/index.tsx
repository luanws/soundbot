import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
  Animated, Easing, NativeSyntheticEvent, StyleProp, TextInput,
  TextInputFocusEventData, TextInputProps, TextStyle
} from 'react-native'
import { useTheme } from '../../../../hooks/theme'
import { Container, Icon, PlaceholderLabel, PlaceholderLabelContainer, TextInputStyled } from './styles'

export interface BorderedTextInputProps extends TextInputProps {
  icon?: string
  inputStyle?: StyleProp<TextStyle>
  noSpace?: boolean
  hasError?: boolean
  onChangeText?: (text: string) => void
  setTextOnChangeText?: (text: string) => string
}

export interface InputValueReference {
  value: string
}

export interface BorderedTextInputRef {
  getText(): string
  setText(text: string): void
  focus(): void
}

const BorderedTextInput: React.ForwardRefRenderFunction<BorderedTextInputRef, BorderedTextInputProps> = (props, ref) => {
  const {
    icon, onFocus, onBlur, style, onChangeText, setTextOnChangeText,
    placeholder, hasError, value: valueProp, ...rest
  } = props

  const theme = useTheme()

  const inputElementRef = useRef<TextInput>(null)
  const placeholderLabelAnim = useRef(new Animated.Value(0)).current

  const [value, setValue] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const isFilled = value !== ''

  useImperativeHandle(ref, () => ({
    getText() {
      return value
    },
    focus() {
      inputElementRef.current?.focus()
    },
    setText(text: string) {
      setValue(text)
    }
  }), [value])

  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp)
    }
  }, [valueProp])

  useEffect(() => {
    Animated.timing(placeholderLabelAnim, {
      toValue: isFocused || isFilled ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start()
  }, [placeholderLabelAnim, isFocused, isFilled])

  const handleInputFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    if (onFocus) onFocus(e)
  }, [onFocus])

  const handleInputBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    if (onBlur) onBlur(e)
  }, [onBlur])

  const handleChangeText = useCallback((text: string) => {
    if (setTextOnChangeText) {
      text = setTextOnChangeText(text)
    }
    setValue(text)
    if (onChangeText) onChangeText(text)
  }, [onChangeText])

  return (
    <Container
      style={style}
      isFocused={isFocused}
      hasError={!!hasError}
    >
      {!!placeholder && (
        <PlaceholderLabelContainer
          hasIcon={!!icon}
          style={{
            transform: [{
              translateX: placeholderLabelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, icon ? -32 : 0],
              })
            }, {
              translateY: placeholderLabelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -26]
              }),
            }, {
              scale: placeholderLabelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 3 / 4],
              })
            }]
          }}
        >
          <PlaceholderLabel isFocused={isFocused}>{placeholder}</PlaceholderLabel>
        </PlaceholderLabelContainer>
      )}
      {icon && <Icon icon={icon} isFocused={isFocused} />}
      <TextInputStyled
        ref={inputElementRef}
        placeholderTextColor={theme.colors.placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        onChangeText={handleChangeText}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(BorderedTextInput)
