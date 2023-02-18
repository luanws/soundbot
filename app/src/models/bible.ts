export type Bible = string[][][]
export type Bibles = { [key: string]: Bible }

export interface BibleReference {
    bookName: string
    chapterNumber: number
    verseNumber: number
}

export interface BibleVerse {
    reference: BibleReference
    text: string
}