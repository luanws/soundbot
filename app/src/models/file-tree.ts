export type FileTreeType = 'file' | 'directory'

export interface FileTree {
    type: FileTreeType
    name: string
    dirname: string
    children: FileTree[]
}