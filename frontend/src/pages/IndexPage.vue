<script setup lang="ts">
import { useStore } from 'src/stores/store';
import { onMounted, ref, watch, computed } from 'vue';
import columns from 'src/components/tableColumns';

const store = useStore();
const step = ref(1);
const tab = ref('PRICE');

watch(
  () => store.loanValue,
  () => {
    store.loanMonths = store.filteredProduct.length
      ? store.filteredProduct[0].NU_MINIMO_MESES || 1
      : 1;
  }
);
watch(step, () => {
  if (step.value === 3) {
    store.calculate();
  }
});

//arredondar para apenas 2 casas decimais
const taxRate = computed(()=>{
  const value = (store.loan?.taxaJuros ?? 0) * 100
  return (Math.round( value * 100) / 100).toLocaleString('pt-BR');
})

onMounted(() => {
  store.loadAllProducts();
});
</script>

<template>
  <q-page class="column items-center justify-evenly">
    <q-stepper v-model="step" bordered header-nav>
      <q-step :name="1" title="Valor">
        <div class="column">
          <span class="text-h6">Digite o valor que você precisa:</span>
          <span> O menor valor possível é R$ 200,00</span>
          <q-input
            v-model="store.loanValue"
            type="number"
            outlined
            dense
            class="col-4"
          />
        </div>
        <div class="row items-center justify-evenly q-mt-md">
          <q-btn-group>
            <q-btn
              icon="chevron_right"
              @click="
                () => {
                  step = 2;
                }
              "
              outlined
            />
          </q-btn-group>
        </div>
      </q-step>
      <q-step :name="2" title="Prazo">
        <div class="column" v-if="store.filteredProduct.length">
          <span class="text-h6">Qual o número de parcelas?</span>
          <span>
            Você pode dividir de
            {{ store.filteredProduct[0].NU_MINIMO_MESES || 1 }} até
            {{ store.filteredProduct[0].NU_MAXIMO_MESES || 480 }}
            prestações</span
          >
          <div class="row items-center justify-center q-ma-md">
            <span class="text-h6">{{ store.loanMonths }} meses</span>
          </div>
          <q-slider
            v-model="store.loanMonths"
            :min="store.filteredProduct[0].NU_MINIMO_MESES || 1"
            :max="store.filteredProduct[0].NU_MAXIMO_MESES || 480"
          />
        </div>
        <div v-else>
          <span class="text-h6"
            >Não há produtos disponíveis para o valor solicitado</span
          >
        </div>
        <div class="row items-center justify-evenly q-mt-md">
          <q-btn-group>
            <q-btn
              icon="chevron_left"
              @click="
                () => {
                  step = 1;
                }
              "
              outlined
            />
            <q-btn
              icon="chevron_right"
              @click="
                () => {
                  step = 3;
                }
              "
              outlined
            />
          </q-btn-group>
        </div>
      </q-step>
      <q-step :name="3" title="Parcelas">
        <div v-if="!store.loan">carregando...</div>
        <div v-else class="column">
          <span class="text-h3">{{ store.loan.descricaoProduto }}</span>
          <span class="text-subtitle">
            Taxa de juros: {{ taxRate }} %
          </span>
          <q-card class="q-mt-lg">
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab
                v-for="s in store.loan.resultadoSimulacao"
                :key="s.tipo"
                :name="s.tipo"
                :label="s.tipo"
              />
            </q-tabs>

            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel
                v-for="s in store.loan.resultadoSimulacao"
                :key="s.tipo"
                :name="s.tipo"
              >
                <span class="text-h5">{{ s.tipo }}</span>
                <q-table
                  :rows="s.parcelas"
                  :rows-per-page-options="[0]"
                  :columns="columns"
                >
                  <!-- para remover a paginacao -->
                  <template v-slot:pagination></template>
                </q-table>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
        <div class="row items-center justify-evenly q-mt-md">
          <q-btn-group>
            <q-btn
              icon="chevron_left"
              @click="
                () => {
                  step = 2;
                }
              "
              outlined
            />
          </q-btn-group>
        </div>
      </q-step>
    </q-stepper>
  </q-page>
</template>
