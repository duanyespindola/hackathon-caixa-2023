# Hackathon CAIXA 2023

by Duany Espíndola ( C056255 )

## Resumo

Projeto desenvolvido como forma de inscrição no envento Hackathon CAIXA 2023 (https://www.hackcaixa.com/).

Trata-se de uma API simples para cálculo de prestações seguindo as tabelas SAC/PRICE, conforme descrito no _Desafio perfil Backend_ em https://stgcaixahackaton.blob.core.windows.net/documentos/Hackathon_2023_Primeiro_Desafio.pdf.

O projeto conta também com uma webapp desenvolvida como frontend para facilitar o teste da api.

## Como rodar o projeto

### Pré-requisitos

A maquina que irá rodar o projeto precisa ter NodeJS 18 instalado ou Docker com docker-compose

O backend utilizará a porta 3000 e o frontend a porta 9000

### Backend

Se for rodar usando o NodeJS da máquina:

```
cd backend
npm install
npm run dev
```

Se for rodar usando o Docker, você deve executar o docker-compose a partir da pasta raiz

```
docker-compose up server -d
```

Testar disparando requisições POST (usar aplicativos como Insomnia, PostMan, etc...) em http://localhost:3000/calculate

## Frontend

Se for rodar usando o NodeJS da máquina

```
cd frontend
npm install
quasar dev
```

Se for rodar usando o Docker, você deve executar o docker-compose a partir da pasta raiz

```
docker-compose up client -d
```

Acessar a partir do browser no endereço http://localhost:9000
