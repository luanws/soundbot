import { Bible } from "../../models/bible"
import { db } from "../connection"

export namespace BibleDAO {
    export async function create(version: string, bible: Bible, progressCallback?: (progress: number) => void): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                bible.forEach((book, bookIndex) => {
                    if (progressCallback) progressCallback(bookIndex / bible.length)
                    book.forEach((chapter, chapterIndex) => {
                        chapter.forEach((text, verseIndex) => {
                            const bookNumber = bookIndex + 1
                            const chapterNumber = chapterIndex + 1
                            const verseNumber = verseIndex + 1
                            tx.executeSql(
                                'INSERT INTO bibles (version, book_number, chapter_number, verse_number, text) VALUES (?, ?, ?, ?, ?);',
                                [version, bookNumber, chapterNumber, verseNumber, text]
                            )
                        })
                    })
                })
            }, reject, resolve)
        })
    }

    export async function getText(version: string, bookNumber: number, chapterNumber: number, verseNumber: number): Promise<string | undefined> {
        return new Promise<string>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT text FROM bibles WHERE version = ? AND book_number = ? AND chapter_number = ? AND verse_number = ?;',
                    [version, bookNumber, chapterNumber, verseNumber],
                    (_, { rows: { _array } }) => {
                        resolve(_array[0]?.text)
                    }
                )
            }, reject)
        })
    }

    export async function getNumberOfChaptersFromBook(version: string, bookNumber: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT DISTINCT chapter_number AS chapters FROM bibles WHERE version = ? AND book_number = ?;',
                    [version, bookNumber],
                    (_, { rows: { _array } }) => {
                        resolve(_array.length)
                    }
                )
            }, reject)
        })
    }

    export async function getNumberOfVersesFromChapter(version: string, bookNumber: number, chapterNumber: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT DISTINCT verse_number AS verses FROM bibles WHERE version = ? AND book_number = ? AND chapter_number = ?;',
                    [version, bookNumber, chapterNumber],
                    (_, { rows: { _array } }) => {
                        resolve(_array.length)
                    }
                )
            }, reject)
        })
    }

    export async function getVersions(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT DISTINCT version FROM bibles;',
                    [],
                    (_, { rows: { _array } }) => {
                        resolve(_array.map(({ version }) => version))
                    }
                )
            }, reject)
        })
    }

    export async function deleteVersion(version: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM bibles WHERE version = ?;',
                    [version]
                )
            }, reject, resolve)
        })
    }
}