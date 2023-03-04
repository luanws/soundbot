import { api } from "../utils/api"

export namespace HymnService {
    function sortHymns(hymns: string[]): string[] {
        return hymns.sort((a, b) => {
            const aNumber = parseInt(a.replace(/-.*/, ''))
            const bNumber = parseInt(b.replace(/-.*/, ''))
            return aNumber - bNumber
        })
    }

    export async function getHymns(): Promise<string[]> {
        const { data } = await api.get('/hymns')
        return sortHymns(data)
    }
}