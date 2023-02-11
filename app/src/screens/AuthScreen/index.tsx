import React, { useRef } from 'react'
import BarCodeScannerModal, { BarCodeScannerModalReference } from '../../components/Modal/BarCodeScannerModal'
import { useAuth } from '../../hooks/auth'
import { Container, ScanQRCodeButton, ScanQRCodeButtonText } from './styles'

interface Props {
}

const AuthScreen: React.FC<Props> = (props) => {
  const { setApiAddress } = useAuth()

  const barCodeScannerModalRef = useRef<BarCodeScannerModalReference>(null)

  function handleScanQRCodeButtonPress() {
    barCodeScannerModalRef.current?.show()
  }

  async function handleBarCodeScanned(data: string) {
    barCodeScannerModalRef.current?.hide()
    setApiAddress(data)
  }

  return (
    <Container>
      <ScanQRCodeButton onPress={handleScanQRCodeButtonPress}>
        <ScanQRCodeButtonText>Escaneie o QR code</ScanQRCodeButtonText>
      </ScanQRCodeButton>
      <BarCodeScannerModal
        ref={barCodeScannerModalRef}
        onBarCodeScanned={handleBarCodeScanned}
      />
    </Container>
  )
}

export default AuthScreen