import req from 'supertest';
import app from '@app/app';



describe('Verificando rotas e verbos HTTP', () => {
    test('GET "/" deve retornar status 404', () => {
        return req(app).get('/').then((res) => {
            expect(res.status).toBe(404);
        });
    });
    test('GET "/calculate" deve retornar status 404', () => {
        return req(app).get('/calculate').then((res) => {
            expect(res.status).toBe(404);
        });
    });
    test('POST "/calculate" deve retornar DIFERENTE de 404', () => {
        return req(app).post('/calculate').then((res) => {
            expect(res.status).not.toBe(404);
        });
    });

});

describe('Validando corpo da requisição', () => {
    const validJson = {
        "valorDesejado": 900.00,
        "prazo": 5
    }
    test('Não enviar os campos obrigatorios retorna status 422', () => {
        return req(app).post('/calculate',).send().then((res) => {
            expect(res.status).toBe(422);
        });
    })
    test('Se enviar valor não numerico retorna status 422', () => {
        return req(app).post('/calculate',).send({ ...validJson, valorDesejado: 'a' }).then((res) => {
            expect(res.status).toBe(422);
        });
    })
    test('Se enviar valor menor que 0.01 retornar status 422', () => {
        return req(app).post('/calculate',).send({ ...validJson, valorDesejado: 0 }).then((res) => {
            expect(res.status).toBe(422);
        });
    })
    test('Se enviar prazo menor que 1 retornar status 422', () => {
        return req(app).post('/calculate',).send({ ...validJson, prazo: 0 }).then((res) => {
            expect(res.status).toBe(422);
        });
    })
    test('Enviar um json valido  retorna status 201', () => {
        return req(app).post('/calculate',).send(validJson).then((res) => {
            expect(res.status).toBe(201);
        });
    })
    test('Deve retornar um json', () => {
        return req(app).post('/calculate',).send(validJson).then((res) => {
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual(
                expect.objectContaining({
                    codigoProduto: expect.any(Number),
                    descricaoProduto: expect.any(String),
                    taxaJuros: expect.any(Number),
                    resultadoSimulacao: expect.arrayContaining([
                        expect.objectContaining({
                            tipo: expect.any(String),
                            parcelas: expect.arrayContaining([
                                expect.objectContaining({
                                    numero: expect.any(Number),
                                    valorAmortizacao: expect.any(Number),
                                    valorJuros: expect.any(Number),
                                    valorPrestacao: expect.any(Number)
                                })
                            ])
                        })
                    ])
                })
            );

        });
    });
});

describe('Validando calculo de juros', () => {

    describe('900.00 em 5 parcelas PRICE', () => {
        const loan = {
            "valorDesejado": 900.00,
            "prazo": 5
        }
        test('Tem que encontrar um produto', () => {
            return req(app).post('/calculate',).send(loan).then((res) => {
                expect(res.status).toBe(201);
            });
        })

    })
});