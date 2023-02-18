import { Theme, ThemeTypes } from "./theme.model"

const defaultColors = {
    primary: '#0487b2',
    primaryLight: '#07c1ff',
    primaryDark: '#024c65',

    accent: '#ffb900',
    accentLight: '#ffff44',
    accentDark: '#b27500',
}

export const themes: { [key in ThemeTypes]: Theme } = {
    light: {
        colors: {
            ...defaultColors,

            background: '#F4F4F4',
            containerBackground: '#fff',
            containerBackgroundColored: '#d2f5d2',
            divider: '#E5E5E5',
            unfocused: "#ddd",
            unfocusedIcon: "#666360",
            focused: "#2E75BB",
            disabled: "#666360",
            placeholder: "#777",

            title: '#ffff44',
            text1: '#111',
            text2: '#444',
            text3: 'gray',
            link: 'blue',

            success: "#00a152",
            info: "#5bc0de",
            warning: "#b2a300",
            danger: "#ab003c",

            icon: '#444',

            actionBar: {
                background: '#fff',
                text: '#444'
            },

            statusBar: {
                background: '#fff',
                icons: 'dark'
            },

            navigationDrawer: {
                activeBackground: '#C3E6FD',
                activeContent: '#0F1B30',
                content: '#36393B'
            },

            navigationBar: {
                background: 'black',
                border: 'transparent'
            }
        }
    },
    dark: {
        colors: {
            ...defaultColors,

            background: '#1F1E1F',
            containerBackground: '#2E2E34',
            containerBackgroundColored: '#193c19',
            divider: '#777',
            unfocused: "#777",
            unfocusedIcon: "#aaa",
            focused: "#3e9fff",
            disabled: "#666360",
            placeholder: "#777",

            title: '#ffff44',
            text1: '#fff',
            text2: '#D3CFC9',
            text3: '#a4a8a0',
            link: 'deepskyblue',

            success: "#00e676",
            info: "#5bc0de",
            warning: "#ffea00",
            danger: "#f50057",

            icon: '#fff',

            actionBar: {
                background: '#2E2E34',
                text: '#fff'
            },

            statusBar: {
                background: '#2E2E34',
                icons: 'light'
            },

            navigationDrawer: {
                activeBackground: '#1C466A',
                activeContent: '#C2E7FE',
                content: '#E8E8ED'
            },

            navigationBar: {
                background: 'black',
                border: 'transparent'
            }
        }
    }
}