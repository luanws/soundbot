import axios from "axios"
import { BibleDAO } from "../database/dao/bible"
import { Bible, BibleReference, BibleVerse } from "../models/bible"

export namespace BibleService {
    const availableVersionsURL = 'https://raw.githubusercontent.com/luanws/bible-database/main/data/available_versions.json'
    const getVersionURL = (version: string) => `https://raw.githubusercontent.com/luanws/bible-database/main/data/hierarchy_json/pt/${version}.json`

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
}