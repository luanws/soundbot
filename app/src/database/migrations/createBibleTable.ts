import { Migration } from "."
import { db } from "../connection"

export const createBibleTable: Migration = {
    name: 'create_bibles_table',
    up: async () => {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    CREATE TABLE IF NOT EXISTS bibles (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        version TEXT NOT NULL,
                        book_number INTEGER NOT NULL,
                        chapter_number INTEGER NOT NULL,
                        verse_number INTEGER NOT NULL,
                        text TEXT NOT NULL,
                        UNIQUE (version, book_number, chapter_number, verse_number)
                    );
                `)
            }, reject, resolve)
        })
    },
    down: async () => {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('DROP TABLE IF EXISTS bibles;')
            }, reject, resolve)
        })
    }
}