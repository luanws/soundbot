import { useFocusEffect } from '@react-navigation/native'
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Keyboard, ListRenderItemInfo, StyleProp, TextInput, ViewStyle } from 'react-native'
import {
  ClearIcon, Container,
  ContainerSearch,
  IconButton,
  ListItemsContainer,
  SearchIcon, SearchTextInput
} from './styles'

interface Props<ItemT> {
  style?: StyleProp<ViewStyle>
  compare?: (text: string, option: string) => boolean
  onSearch?: (searchText: string) => void
  data: ItemT[]
  renderList(items: ItemT[]): JSX.Element
  onSelectItem?: (props: ListRenderItemInfo<ItemT>) => void
  onChangeText?: (text: string) => void
  children?: ReactNode
  onFocus?: () => void
  searchText?: string
  onClear?(): void
  placeholder?: string
  disableAutoHideContent?: boolean
  renderLeft?: () => JSX.Element
}

function SearchView<ItemT>(props: Props<ItemT>) {
  const { data, renderList, onSearch, onSelectItem, renderLeft } = props

  const textInputAutocompleteRef = useRef<TextInput>(null)

  const [searchText, setSearchText] = useState<string>('')

  useFocusEffect(useCallback(() => {
    if (props.onFocus) props.onFocus()
  }, []))

  useEffect(() => {
    if (props.searchText !== undefined) setSearchText(props.searchText)
  }, [props.searchText])

  useEffect(() => {
    if (props.onChangeText) props.onChangeText(searchText)
  }, [searchText])

  const search = useCallback((searchText: string) => {
    Keyboard.dismiss()
    if (onSearch) onSearch(searchText)
  }, [onSearch, textInputAutocompleteRef])

  const handleOnPressClearText = useCallback(() => {
    setSearchText("")
    if (props.onClear) props.onClear()
  }, [setSearchText, textInputAutocompleteRef, props.onClear])

  const handleOnChangeText = useCallback((text: string) => {
    setSearchText(text)
  }, [setSearchText, textInputAutocompleteRef])

  const handleOnSelectAutocompleteOption = useCallback((option: string) => {
    setSearchText(option)
    search(option)
  }, [search, setSearchText])

  return (
    <Container style={props.style}>
      <ContainerSearch>
        {!renderLeft ? (
          <IconButton onPress={() => search(searchText)}>
            <SearchIcon />
          </IconButton>
        ) : renderLeft()}
        <SearchTextInput
          ref={textInputAutocompleteRef}
          placeholder={props.placeholder || 'Pesquise aqui...'}
          value={searchText}
          onChangeText={handleOnChangeText}
          returnKeyType="search"
          onSubmitEditing={() => search(searchText)}
        />
        <IconButton onPress={handleOnPressClearText}>
          <ClearIcon />
        </IconButton>
      </ContainerSearch>

      {(props.disableAutoHideContent || !props.data?.length) && props.children}

      {props.data?.length > 0 && (
        <ListItemsContainer>
          {renderList(data)}
        </ListItemsContainer>
      )}
    </Container>
  )
}

export default SearchView