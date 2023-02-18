import axios from "axios"
import { BibleDAO } from "../database/dao/bible"
import { Bible, BibleReference } from "../models/bible"

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

    export async function downloadVersion(version: string) {
        const bible = await getBibleOnline(version)
        await BibleDAO.create(version, bible)
    }

    export async function deleteVersion(version: string) {
        await BibleDAO.deleteVersion(version)
    }

    export async function getAvailableVersions(): Promise<string[]> {
        return await BibleDAO.getVersions()
    }

    export async function getBible(version: string): Promise<Bible> {
        return await BibleDAO.getBible(version)
    }

    export function getTextFromBible(bible: Bible, book: number, chapter: number, verse: number): string {
        return bible[book - 1][chapter - 1][verse - 1]
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
}