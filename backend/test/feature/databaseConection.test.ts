import { Database } from '@app/database'

describe('Conexão com o banco de dados', () => {
    const database = Database.getInstance()

    beforeAll(async () => {
        await database.connect()
        if (!database.connected) {
            throw new Error("Banco não contectado");

        }
    })

    test('Database deve ser um singleton', async () => {
        const conn1 = Database.getInstance()
        const conn2 = Database.getInstance()
        expect(conn1).toBe(conn2);
    })

    test('Deve trazer 4 registros', async () => {
        const res = await database.getAll()
        expect(res?.length).toBe(4);

    })
})