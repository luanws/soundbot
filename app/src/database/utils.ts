import { db } from "."

export namespace DatabaseUtils {
    export async function showTables(): Promise<void> {
        try {
            await db.transaction(tx => {
                tx.executeSql(
                    'SELECT name, sql from sqlite_master where type="table"',
                    [],
                    (_, { rows }) => {
                        const tables: { [key: string]: { [key: string]: string } } = {}
                        rows._array.forEach(table => {
                            const tableName = table.name
                            const columns: string[] = table.sql.match(/\((.*)\)/g)[0]
                                .replace('(', '')
                                .replace(')', '')
                                .split(',')
                            columns.forEach(column => {
                                const [columnName, columnType] = column.trim().split(' ')
                                if (!tables[tableName]) tables[tableName] = {}
                                tables[tableName][columnName] = columnType
                            })
                        })
                        console.log(JSON.stringify(tables, null, 2))
                    }
                )
            })
        } catch (error) {
            console.log(error)
        }
    }

    export async function dropDatabase() {
        try {
            await db.transaction(tx => {
                tx.executeSql(
                    'SELECT name from sqlite_master where type="table"',
                    [],
                    (_, { rows }) => {
                        rows._array.forEach(table => {
                            tx.executeSql(`DROP TABLE ${table.name}`)
                        })
                    }
                )
            })
        } catch (error) {
            console.log(error)
        }
    }
}