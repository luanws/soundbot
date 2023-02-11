import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Dimensions, View } from "react-native"
import { styled } from "../../../hooks/theme"

const displayWidth = Dimensions.get('window').width
const displayHeight = Dimensions.get('window').height
const scanIconSize = displayWidth * 0.6
const scanIconLeftPosition = (displayWidth - scanIconSize) / 2
const scanIconTopPosition = (displayHeight - scanIconSize) / 2

export const Container = styled(View)`
    background-color: black;
    flex: 1;
    padding: 8px;
`

export const Scanner = styled(BarCodeScanner)`
    flex: 1;
`

export const ScanIcon = styled(MaterialCommunityIcons)`
    color: white;
    font-size: ${scanIconSize}px;
    position: absolute;
    left: ${scanIconLeftPosition}px;
    top: ${scanIconTopPosition}px;
`