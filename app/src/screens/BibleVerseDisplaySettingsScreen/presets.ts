import { BibleVerseDisplaySettings } from "../../models/bible-verse-display-settings"

export const generalPreset: BibleVerseDisplaySettings = {
    fontSize: 32,
    margin: 64,
    fontFamily: 'Roboto',
}

export const presets: { [key: string]: BibleVerseDisplaySettings } = {
    'dark': {
        backgroundColor: '#000000',
        textColor: '#ffffff',
        referenceTextColor: '#ffffff',
    },
    'light': {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        referenceTextColor: '#000000',
    },
    'dracula': {
        backgroundColor: '#282a36',
        referenceTextColor: '#8fa7eb',
        textColor: '#8fa7eb',
    },
    'gruvbox': {
        backgroundColor: '#282828',
        textColor: '#ebdbb2',
        referenceTextColor: '#ebdbb2',
    },
    'gruvbox dark': {
        backgroundColor: '#1d2021',
        textColor: '#ebdbb2',
        referenceTextColor: '#ebdbb2',
    },
    'monokai': {
        backgroundColor: '#272822',
        textColor: '#f8f8f2',
        referenceTextColor: '#f8f8f2',
    },
    'nord': {
        backgroundColor: '#2e3440',
        textColor: '#88c0d0',
        referenceTextColor: '#88c0d0',
    },
    'solarized dark': {
        backgroundColor: '#002b36',
        textColor: '#839496',
        referenceTextColor: '#839496',
    },
    'solarized light': {
        backgroundColor: '#fdf6e3',
        textColor: '#657b83',
        referenceTextColor: '#657b83',
    },
    'tomorrow night': {
        backgroundColor: '#1d1f21',
        textColor: '#c5c8c6',
        referenceTextColor: '#c5c8c6',
    },
    'tomorrow night blue': {
        backgroundColor: '#002451',
        textColor: '#ffffff',
        referenceTextColor: '#ffffff',
    },
    'tomorrow night eighties': {
        backgroundColor: '#2d2d2d',
        textColor: '#cccccc',
        referenceTextColor: '#cccccc',
    },
    'pink': {
        backgroundColor: '#fad8f9',
        textColor: '#d8439e',
        referenceTextColor: '#d8439e',
    },
}