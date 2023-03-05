import { FileTree } from "../models/file-tree"
import { api } from "../utils/api"

export namespace SongService {
    export async function getSongs(): Promise<FileTree> {
        const { data } = await api.get('/songs')
        return data
    }
}