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

    export function map<T>(fileTreeArray: FileTree[], callback: (fileTree: FileTree) => T): T[] {
        const mapped: T[] = []
        forEach(fileTreeArray, fileTree => {
            const mappedFileTree = callback(fileTree)
            mapped.push(mappedFileTree)
        })
        return mapped
    }

    export function find(fileTreeArray: FileTree[], callback: (fileTree: FileTree) => boolean): FileTree | undefined {
        return filter(fileTreeArray, callback)[0]
    }
}