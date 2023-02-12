import { Bible } from "../../models/bible"
import { db } from "../connection"

export namespace BibleDAO {
    export async function create(version: string, bible: Bible): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO bibles (version, bible) VALUES (?, ?);',
                    [version, JSON.stringify(bible)]
                )
            }, reject, resolve)
        })
    }

    export async function get(version: string): Promise<Bible> {
        return new Promise<Bible>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT bible FROM bibles WHERE version = ?;',
                    [version],
                    (_, { rows: { _array } }) => {
                        resolve(JSON.parse(_array[0].bible))
                    }
                )
            }, reject)
        })
    }

    export async function getVersions(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT id, version FROM bibles;',
                    [],
                    (_, { rows: { _array } }) => {
                        resolve(_array.map((bible: any) => bible.version))
                    }
                )
            }, reject)
        })
    }
}