import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import Menu from '../../components/Menu'
import { useAuth } from '../../hooks/auth'
import { MainDrawerParamList } from '../../routes/main.routes'
import NavigateButton from './NavigateButton'
import { Container, NavigationButtonsContainer, Scroll } from './styles'
import UpdateCheckerCard from './UpdateCheckerCard'

const HomeScreen: React.FC = (props) => {
  const navigation = useNavigation<NavigationProp<MainDrawerParamList>>()
  const { clearApiAddress } = useAuth()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu items={[
          { label: 'Sair', onPress: clearApiAddress },
        ]} />
      )
    })
  }, [])

  return (
    <Scroll>
      <Container>
        <UpdateCheckerCard />
        <NavigationButtonsContainer>
          <NavigateButton
            icon='Ionicons/musical-notes'
            title='Hinário'
            onPress={() => navigation.navigate('Hymnbook')}
          />
          <NavigateButton
            icon='FontAwesome5/bible'
            title='Bíblia'
            onPress={() => navigation.navigate('Bible')}
          />
          <NavigateButton
            icon='MaterialIcons/settings'
            title='Configurações'
            onPress={() => navigation.navigate('Settings')}
          />
        </NavigationButtonsContainer>
      </Container>
    </Scroll>
  )
}

export default HomeScreen