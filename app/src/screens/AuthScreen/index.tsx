import * as BarCodeScanner from 'expo-barcode-scanner'
import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import BibleVersionsManager from '../../components/Bible/BibleVersionsManager'
import BarCodeScannerModal, { BarCodeScannerModalReference } from '../../components/Modal/BarCodeScannerModal'
import { useAuth } from '../../hooks/auth'
import Section from './Section'
import { Container, ScanQRCodeButton, ScanQRCodeButtonText } from './styles'

const AuthScreen: React.FC = (props) => {
  const { setApiAddress } = useAuth()

  const barCodeScannerModalRef = useRef<BarCodeScannerModalReference>(null)

  async function handleScanQRCodeButtonPress() {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    if (status !== 'granted') handleScanQRCodeButtonPress()
    barCodeScannerModalRef.current?.show()
  }

  async function handleBarCodeScanned(data: string) {
    barCodeScannerModalRef.current?.hide()
    setApiAddress(data)
  }

  return (
    <ScrollView>
      <Container>
        <Section
          title='Conexão'
          description={
            'Escaneie o QR code que aparece na tela do computador para conectar o aplicativo ao Soundbot. ' +
            'Para que o QR code apareça, o Soundbot deve estar em execução no computador.'
          }
        >
          <ScanQRCodeButton onPress={handleScanQRCodeButtonPress}>
            <ScanQRCodeButtonText>Escanear QR code</ScanQRCodeButtonText>
          </ScanQRCodeButton>
          <BarCodeScannerModal
            ref={barCodeScannerModalRef}
            onBarCodeScanned={handleBarCodeScanned}
          />
        </Section>
        <Section
          title='Versões da bíblia'
          description={
            'Selecione as versões da bíblia que deseja utilizar. ' +
            'As versões selecionadas serão baixadas automaticamente.'
          }
        >
          <BibleVersionsManager />
        </Section>
      </Container>
    </ScrollView >
  )
}

export default AuthScreen