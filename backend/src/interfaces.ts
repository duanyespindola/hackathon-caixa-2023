export interface Installment {
    numero: Number;
    valorAmortizacao: Number;
    valorJuros: Number;
    valorPrestacao: Number;
}

export interface Simulation {
    tipo: String;
    parcelas: Array<Installment>;
}

export interface Product {
    codigoProduto: Number;
    descricaoProduto: String;
    taxaJuros: Number;
    resultadoSimulacao: Array<Simulation>;
}