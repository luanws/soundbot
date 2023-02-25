import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Modal } from 'react-native'
import { Container, ScanIcon, Scanner } from './styles'

interface Props {
  onBarCodeScanned(data: string): void
}

export interface BarCodeScannerModalReference {
  show(): void
  hide(): void
}

const BarCodeScannerModal: React.ForwardRefRenderFunction<BarCodeScannerModalReference, Props> = (props, ref) => {
  const { onBarCodeScanned } = props

  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }))

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}
    >
      <Container>
        <Scanner
          onBarCodeScanned={({ data }) => onBarCodeScanned(data)}
        />
        <ScanIcon name='scan-helper'>

        </ScanIcon>
      </Container>
    </Modal>
  )
}

export default forwardRef(BarCodeScannerModal)