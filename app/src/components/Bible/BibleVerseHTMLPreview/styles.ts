import { Dimensions, ScrollView, Text, View } from "react-native"
import { WebView } from "react-native-webview"
import { styled } from "../../../hooks/theme"

const { width } = Dimensions.get("window")

export const Container = styled(View)`
    height: ${width * (3 / 4)}px;
    overflow: hidden;
`

export const PreviewWebView = styled(WebView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`