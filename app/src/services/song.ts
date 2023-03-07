import { FileTree } from "../models/file-tree"
import { api } from "../utils/api"
import { FileTreeUtils } from "../utils/file-tree"

export namespace SongService {
    export async function getSongs(): Promise<FileTree> {
        const { data } = await api.get('/songs')
        return data
    }

    export function searchSongs(fileTreeArray: FileTree[], searchText: string): FileTree[] {
        return FileTreeUtils.filter(fileTreeArray, fileTree => {
            const isFile = fileTree.type === 'file'
            const isLike = fileTree.name.like(searchText)
            return isFile && isLike
        })
    }
}