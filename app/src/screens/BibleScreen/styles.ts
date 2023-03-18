import { Text, View, ScrollView, Dimensions } from "react-native"
import { styled } from "../../hooks/theme"
import { WebView } from "react-native-webview"

const { width } = Dimensions.get("window")

export const Container = styled(View)`
    flex: 1;
`

export const ContentContainer = styled(ScrollView)`
    flex: 1;
`

export const BibleTextContainer = styled(View)`
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.successContainer};
    border-radius: 4px;
    margin: 0px 16px;
`

export const PreviewWebViewContainer = styled(View)`
    height: ${width*(3/4)}px;
    overflow: hidden;
`

export const PreviewWebView = styled(WebView)`
    flex: 1;
`

export const BibleText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
`

export const SwitchContainer = styled(View)`
    margin: 0px 16px;
`

export const WarningContainer = styled(View)`
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.warningContainer};
    border-radius: 4px;
    margin: 0px 16px;
    margin-top: 8px;
`

export const WarningText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
`