<template>
  <div class="q-pa-md">
    <q-table
      title="Carrito de Compras"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td></q-td>
          <q-td key="description" ><q-img :src="props.row.url_img" style="height: 50px; max-width: 50px" />{{ props.row.description }}</q-td>
          <q-td key="price">{{ props.row.price }}</q-td>
          <q-td key="amount" :props="props">
            <div class="text-pre-wrap">{{ props.row.amount }}</div>
            <q-popup-edit v-model="props.row.amount" title="Cantidad">
              <q-input type="number" @change="chanceAmount(props.row)" v-model="props.row.amount" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="discount">
            {{ props.row.discount }}
          </q-td>
          <q-td key="total" >{{ props.row.total }}</q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'product',
    required: true,
    label: 'Productos',
    align: 'Center',
    field: row => row.description,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'price', align: 'center', label: 'Precio', field: 'price', sortable: true },
  { name: 'amount', align: 'center', label: 'Cantidad', field: 'amount', sortable: true },
  { name: 'discount', align: 'center', label: 'Descuento', field: 'discount' },
  { name: 'total', align: 'center', label: 'Total', field: 'total' }
]
const rows = JSON.parse(localStorage.getItem('productsCard'))
export default {
  methods: {
    chanceAmount (row) {
      console.log(row)
      this.$store.dispatch('storePush/updateProductAction', row)
    }
  },
  setup () {
    const selected = ref([])
    return {
      selected,
      columns,
      rows: ref(rows),

      getSelectedString () {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
      }
    }
  }
}
</script>
<style>
  .card-products{
    width: 31%;
    min-height: 38em;
  }
  .q-carousel{
    max-height: 300px;
  }
</style>
