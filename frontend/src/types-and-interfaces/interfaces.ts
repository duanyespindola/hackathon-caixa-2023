export type Installment = {
  numero: number;
  valorAmortizacao: number;
  valorJuros: number;
  valorPrestacao: number;
};

export type Simulation = {
  tipo: string;
  parcelas: Array<Installment>;
};

export type Loan = {
  codigoProduto: number;
  descricaoProduto: string;
  taxaJuros: number;
  resultadoSimulacao: Array<Simulation>;
};

export type Product = {
  CO_PRODUTO: number;
  NO_PRODUTO: string;
  PC_TAXA_JUROS: number;
  NU_MINIMO_MESES: number;
  NU_MAXIMO_MESES: number;
  VR_MINIMO: number;
  VR_MAXIMO: number;
};
