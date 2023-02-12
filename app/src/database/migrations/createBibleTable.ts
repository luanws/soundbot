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
                        version TEXT NOT NULL UNIQUE,
                        bible TEXT NOT NULL
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