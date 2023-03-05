import { api } from "../utils/api"

interface HymnResponse {
    dirname: string
    filenames: string[]
}

export namespace HymnService {
    function sortHymns(hymns: string[]): string[] {
        return hymns.sort((a, b) => {
            const aNumber = parseInt(a.replace(/-.*/, ''))
            const bNumber = parseInt(b.replace(/-.*/, ''))
            return aNumber - bNumber
        })
    }

    export async function getHymns(): Promise<HymnResponse> {
        const { data } = await api.get('/hymns')
        const { dirname, filenames } = data as HymnResponse
        return { dirname, filenames: sortHymns(filenames) }
    }
}