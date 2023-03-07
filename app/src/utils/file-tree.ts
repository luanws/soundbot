import { FileTree } from "../models/file-tree"

export namespace FileTreeUtils {
    export function forEach(fileTreeArray: FileTree[], callback: (fileTree: FileTree) => void) {
        fileTreeArray.forEach(fileTree => {
            callback(fileTree)
            forEach(fileTree.children, callback)
        })
    }

    export function filter(fileTreeArray: FileTree[], callback: (fileTree: FileTree) => boolean): FileTree[] {
        return fileTreeArray.reduce<FileTree[]>((acc, fileTree) => {
            const isFiltered = callback(fileTree)
            if (isFiltered) {
                acc.push(fileTree)
            }
            const filteredChildren = filter(fileTree.children, callback)
            acc.push(...filteredChildren)
            return acc
        }, [])
    }
}