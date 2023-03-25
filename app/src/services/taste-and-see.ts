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
            const isLike = fileTree.name.includesLike(searchText)
            return isFile && isLike
        })
    }

    function checkPathIsToday(fileTree: FileTree, month: number, day: number): boolean {
        let path = fileTree.dirname + '/' + fileTree.name
        path = path.replace(/\\/g, '/').replace(/\/\//g, '/')
        const regex = new RegExp(`.*/0?${month}.*/0?${day}.*`)
        const isToday = regex.test(path)
        return isToday
    }

    export function getTodayTasteAndSee(fileTreeArray: FileTree[]): FileTree | undefined {
        const today = new Date()
        const month = today.getMonth() + 1
        const day = today.getDate()

        const todayTasteAndSee = FileTreeUtils.find(fileTreeArray, fileTree => {
            const isFile = fileTree.type === 'file'
            if (!isFile) return false
            return checkPathIsToday(fileTree, month, day)
        })

        return todayTasteAndSee
    }
}