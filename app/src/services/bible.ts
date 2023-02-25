import axios from "axios"
import { BibleDAO } from "../database/dao/bible"
import { BibleReference, BibleVerse } from "../models/bible"

export namespace BibleService {
    const availableVersionsURL = 'https://raw.githubusercontent.com/luanws/bible-database/main/data/available_versions.json'
    const getVersionURL = (version: string) => `https://raw.githubusercontent.com/luanws/bible-database/main/data/hierarchy_json/pt/${version}.json`
    const allBookNames = [
        'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio',
        'Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel',
        '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras',
        'Neemias', 'Ester', 'Jó', 'Salmos', 'Provérbios', 'Eclesiastes',
        'Cânticos dos Cânticos', 'Isaías', 'Jeremias', 'Lamentações de Jeremias',
        'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós', 'Obadias', 'Jonas',
        'Miquéias', 'Naum', 'Habacuque', 'Sofonias', 'Ageu', 'Zacarias',
        'Malaquias', 'Mateus', 'Marcos', 'Lucas', 'João', 'Atos dos Apóstolos',
        'Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas', 'Efésios',
        'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses',
        '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', '1 Pedro',
        '2 Pedro', '1 João', '2 João', '3 João', 'Judas', 'Apocalipse'
    ]

    export async function getAvailableVersionsForDownload(): Promise<string[]> {
        const response = await axios.get(availableVersionsURL)
        return response.data['hierarchy_json']['pt']
    }

    async function getBibleOnline(version: string) {
        const response = await axios.get(getVersionURL(version))
        return response.data
    }

    export async function downloadVersion(version: string, progressCallback?: (progress: number) => void) {
        const bible = await getBibleOnline(version)
        await BibleDAO.create(version, bible, progressCallback)
    }

    export async function deleteVersion(version: string) {
        await BibleDAO.deleteVersion(version)
    }

    export async function getAvailableVersions(): Promise<string[]> {
        return await BibleDAO.getVersions()
    }

    export async function getTextFromBible(version: string, reference: BibleReference): Promise<string | undefined> {
        const { bookName, chapterNumber, verseNumber } = reference
        const bookNumber = allBookNames.indexOf(bookName) + 1
        const text = await BibleDAO.getText(version, bookNumber, chapterNumber, verseNumber)
        return text
    }

    function range(start: number, end: number): number[] {
        return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
    }

    export async function getChapterNumbersFromBook(version: string, bookName: string): Promise<number[]> {
        const bookNumber = getBookNumberOfBookName(bookName)
        const numberOfChapters = await BibleDAO.getNumberOfChaptersFromBook(version, bookNumber)
        return range(1, numberOfChapters)
    }

    export async function getVerseNumbersFromChapter(version: string, bookName: string, chapterNumber: number): Promise<number[]> {
        const bookNumber = getBookNumberOfBookName(bookName)
        const numberOfVerses = await BibleDAO.getNumberOfVersesFromChapter(version, bookNumber, chapterNumber)
        return range(1, numberOfVerses)
    }

    export function bibleReferenceToString(reference: BibleReference): string {
        return `${reference.bookName} ${reference.chapterNumber}:${reference.verseNumber}`
    }

    export function getAllBookNames(): string[] {
        return allBookNames
    }

    export function getIndexOfBookName(bookName: string): number {
        return allBookNames.indexOf(bookName)
    }

    export function getBookNumberOfBookName(bookName: string): number {
        return getIndexOfBookName(bookName) + 1
    }

    export async function getVerseFromBible(version: string, reference: BibleReference): Promise<BibleVerse | undefined> {
        const text = await getTextFromBible(version, reference)
        return text ? { reference, text } : undefined
    }

    export async function getNextVerse(version: string, reference: BibleReference): Promise<BibleVerse | undefined> {
        return await getVerseFromBible(version, { ...reference, verseNumber: reference.verseNumber + 1 })
    }

    export async function getPreviousVerse(version: string, reference: BibleReference): Promise<BibleVerse | undefined> {
        return await getVerseFromBible(version, { ...reference, verseNumber: reference.verseNumber - 1 })
    }
}