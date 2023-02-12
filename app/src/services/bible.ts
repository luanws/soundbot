import axios from "axios"
import Storage from "../utils/storage"

type Bible = string[][][]
type Bibles = { [key: string]: Bible }

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
        const bibles = await Storage.get<Bibles>('bibles')
        await Storage.set('bibles', { ...bibles, [version]: bible })
    }

    export async function getAvailableVersions(): Promise<string[]> {
        const bibles = await Storage.get<Bibles>('bibles')
        if (!bibles) return []
        return Object.keys(bibles)
    }

    export async function getBible(version: string): Promise<Bible> {
        const bibles = await Storage.get<Bibles>('bibles')
        if (!bibles) return []
        return bibles[version]
    }
}