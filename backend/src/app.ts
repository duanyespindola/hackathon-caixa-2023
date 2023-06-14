import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
//
import { Database } from '@app/database'
import { Product } from '@app/interfaces'
import priceCalculator from '@app/calculators/priceCalculator';
import sacCalculator from '@app/calculators/sacCalculator';
import { EventHub } from '@app/eventHub';

dotenv.config();
const database = Database.getInstance()
database.connect()
//
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
//
app.post('/calculate', async (req, res) => {
    //validando o conteudo da requisição
    const valorDesejado = Number(req.body.valorDesejado);
    const prazo = Number(req.body.prazo);
    if (!(valorDesejado && prazo)) {
        return res.status(422).send('As propriedades "valorDesejado"  e "prazo" precisam conter valores numéricos maiores que zero');
    }

    //verificando conexão com o banco de dados
    await database.connect()
    if (!database.connected) {
        return res.status(500).send('Erro ao conectar ao banco de dados');
    }

    //buscando o produto
    const products = await database.findProduct(valorDesejado, prazo)
    if (!products?.length) {
        return res.status(404).send('Nenhum produto encontrado');
    }

    //calculando as parcelas
    const simulation: Product = {
        codigoProduto: products[0].CO_PRODUTO as number,
        descricaoProduto: products[0].NO_PRODUTO as string,
        taxaJuros: products[0].PC_TAXA_JUROS as number,
        resultadoSimulacao: [
            {
                "tipo": "PRICE",
                "parcelas": priceCalculator(valorDesejado, prazo, products[0].PC_TAXA_JUROS as number)
            },
            {
                "tipo": "SAC",
                "parcelas": sacCalculator(valorDesejado, prazo, products[0].PC_TAXA_JUROS as number)
            },

        ]
    }
    //enviando dados ao cliente
    res.status(201).json(simulation).send();

    //enviando dados ao eventHub
    const hub = new EventHub()
    await hub.send(simulation)
})
app.get('/products', async (req, res) => {
    //verificando conexão com o banco de dados
    await database.connect()
    if (!database.connected) {
        return res.status(500).send('Erro ao conectar ao banco de dados');
    }

    //buscando o produto
    const products = await database.getAll()
    if (!products?.length) {
        return res.status(404).send('Nenhum produto encontrado');
    }

    return res.status(200).json(products);
})

module.exports = app;
export default app; 