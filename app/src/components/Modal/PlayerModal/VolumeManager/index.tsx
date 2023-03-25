import React, { useEffect } from 'react'
import usePersistedState from '../../../../hooks/persisted-state'
import { CommandService } from '../../../../services/command'
import SliderInput from '../../../FormComponents/SliderInput'
import { Container, SliderContainer, VolumeButton, VolumeIcon } from './styles'

interface Props {
}

const VolumeManager: React.FC<Props> = (props) => {
  const [volume, setVolume] = usePersistedState<number>('desktop-volume', 0.5)

  useEffect(() => {
    handleVolumeChange(volume)
  }, [volume])

  async function handleVolumeChange(newVolume: number) {
    await CommandService.setVolume(newVolume)
  }

  function handleVolumeDown() {
    const newVolume = volume - 0.1
    setVolume(newVolume < 0 ? 0 : newVolume)
  }

  function handleVolumeUp() {
    const newVolume = volume + 0.1
    setVolume(newVolume > 1 ? 1 : newVolume)
  }

  return (
    <Container>
      <VolumeButton activeOpacity={0.7} onPress={handleVolumeDown}>
        <VolumeIcon name='volume-1' />
      </VolumeButton>
      <SliderContainer>
        <SliderInput
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={volume}
          onValueChange={setVolume}
        />
      </SliderContainer>
      <VolumeButton activeOpacity={0.7} onPress={handleVolumeUp}>
        <VolumeIcon name='volume-2' />
      </VolumeButton>
    </Container>
  )
}

export default VolumeManager