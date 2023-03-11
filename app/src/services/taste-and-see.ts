import { FileTree } from "../models/file-tree"
import { api } from "../utils/api"
import { FileTreeUtils } from "../utils/file-tree"

export namespace TasteAndSeeService {
    export async function getTasteAndSees(): Promise<FileTree> {
        const { data } = await api.get('/taste_and_see')
        return data
    }

    export function searchTasteAndSees(fileTreeArray: FileTree[], searchText: string): FileTree[] {
        return FileTreeUtils.filter(fileTreeArray, fileTree => {
            const isFile = fileTree.type === 'file'
            const isLike = fileTree.name.like(searchText)
            return isFile && isLike
        })
    }
}