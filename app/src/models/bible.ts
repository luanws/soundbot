export type Bible = string[][][]

export interface BibleReference {
    bookName: string
    chapterNumber: number
    verseNumber: number
}

export interface BibleVerse {
    reference: BibleReference
    text: string
}