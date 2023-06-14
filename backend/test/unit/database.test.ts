import { Database } from '@app/database'

describe('Consulta ao banco de dados', () => {
    const database = Database.getInstance()

    beforeAll(async () => {
        await database.connect()
        if (!database.connected) {
            throw new Error("Banco não contectado");
        }
    })

    test('Deve trazer o produto 1', async () => {
        const res = await database.findProduct(900, 5)
        expect(res?.length).toBe(1);
        expect(res?.[0].NO_PRODUTO).toBe('Produto 1');
    })
    test('Deve trazer o produto 4', async () => {
        const res = await database.findProduct(1000001.00, 100)
        expect(res?.length).toBe(1);
        expect(res?.[0].NO_PRODUTO).toBe('Produto 4');
    })
    test('Não deve trazer nenhum produto', async () => {
        const res = await database.findProduct(90 * 1000, 20)
        expect(res?.length).toBe(0);
    })
    test('Deve trazer todos os produtos', async () => {
        const res = await database.getAll()
        expect(res?.length).toBe(4);
    })
})