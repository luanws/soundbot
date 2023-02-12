import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Menu from '../../components/Menu'
import { useAuth } from '../../hooks/auth'

interface Props {
}

const HomeScreen: React.FC<Props> = (props) => {
  const navigation = useNavigation()
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
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen