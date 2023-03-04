import { api } from "../utils/api"

export namespace HymnService {
    export async function getHymns(): Promise<string[]> {
        const { data } = await api.get('/hymns')
        return data
    }
}