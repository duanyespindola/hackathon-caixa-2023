const columns = [
  {
    name: 'numero',
    field: 'numero',
    label: 'Numero',
    sortOrder: 'ad',
    sortable: false,
  },
  {
    name: 'valorAmortizacao',
    field: 'valorAmortizacao',
    label: 'Amortização',
    sortable: false,
    format: (val: number) => val.toLocaleString('pt-BR'),
  },
  {
    name: 'valorJuros',
    field: 'valorJuros',
    label: 'Juros',
    sortable: false,
    format: (val: number) => val.toLocaleString('pt-BR'),
  },
  {
    name: 'valorPrestacao',
    field: 'valorPrestacao',
    label: 'Prestação',
    sortable: false,
    format: (val: number) =>
      val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    classes: 'text-bold',
  },
];
export default columns;
