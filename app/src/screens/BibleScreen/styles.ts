import { Dimensions, ScrollView, Text, View } from "react-native"
import { WebView } from "react-native-webview"
import { styled } from "../../hooks/theme"

const { width } = Dimensions.get("window")

export const Container = styled(View)`
    flex: 1;
`

export const ContentScroll = styled(ScrollView)`
    flex: 1;
`

export const ContentContainer = styled(View)`
    flex: 1;
    margin-bottom: 80px;
`

export const BibleTextContainer = styled(View)`
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.successContainer};
    border-radius: 4px;
    margin: 0px 16px;
    margin-bottom: 8px;
`

export const PreviewWebViewContainer = styled(View)`
    height: ${width * (3 / 4)}px;
    overflow: hidden;
    margin-bottom: 8px;
`

export const PreviewWebView = styled(WebView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
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
    margin-bottom: 8px;
`

export const WarningText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
`