import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Loan, Product } from 'src/types-and-interfaces/interfaces';

export const useStore = defineStore('store', {
  state: () => ({
    products: [] as Array<Product>,
    loan: null as Loan | null,
    loanValue: 200,
    loanMonths: 1,
  }),
  getters: {
    filteredProduct(): Array<Product> {
      return this.products.filter(
        (product) =>
          (product.VR_MINIMO <= this.loanValue || product.VR_MINIMO == null) &&
          (product.VR_MAXIMO >= this.loanValue || product.VR_MAXIMO == null)
      );
    },
  },
  actions: {
    async loadAllProducts() {
      api
        .get('/products')
        .then((resp) => {
          this.products = resp.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async calculate() {
      this.loan = null;
      api
        .post('/calculate', {
          valorDesejado: this.loanValue,
          prazo: this.loanMonths,
        })
        .then((resp) => {
          this.loan = resp.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
