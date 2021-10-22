<template>
  <q-page class="q-pa-md list-card">
    <h1 class="title-card-store">Carrito de compra</h1>
    <q-markup-table flat bordered>
      <thead class="bg-primary text-white">
      <tr>
        <th class="text-center">Productos</th>
        <th class="text-center">Cantidad</th>
        <th class="text-center">Precio x Unidad</th>
        <th class="text-center">Descuento</th>
        <th class="text-center">Total</th>
        <th class="text-center"></th>
      </tr>
      </thead>
      <tbody class="bg-white">
      <tr v-for="(index, product) in listsProducts.product" :key="product.id">
        <td class="text-left"><q-img :src="product.url_img" style="height: 50px; max-width: 50px" /> {{product.description}}</td>
        <td class="text-center"><q-btn :label="product.amount"  @click="small = true, selectAmount(product)"/> </td>
        <td class="text-center">{{product.price}}</td>
        <td class="text-center">{{product.discount}}</td>
        <td class="text-center">{{product.total}}</td>
        <td class="text-center"><q-btn class="text-red" icon="delete_outline" label="Eliminar" @click="deleteUnitProductCard(index)"></q-btn></td>
      </tr>
      </tbody>
    </q-markup-table>
    <div class="q-mt-md">
      <q-btn class="" @click="clearListCard">Vaciar El carrito</q-btn>
    </div>
    <q-dialog
      v-model="small"
    >
      <q-card style="width: 150px">
        <q-card-section>
          <q-input @change="updateAmount"  :dense="dense" type="number"  v-model="data.amount"  />
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Listo" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from 'vue'

import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: {
        amount: 0
      }
    }
  },
  methods: {
    deleteUnitProductCard (row) {
      this.listsProducts.product.split(row)
      this.$store.dispatch('storePush/updateProductAction', this.listsProducts.product)
    },
    updateAmount (row) {
      console.log(row)
      this.$store.dispatch('storePush/updateProductAction', this.data)
    },
    clearListCard () {
      this.$store.dispatch('storePush/deleteProductAction')
    },
    selectAmount (product) {
      this.data.amount = product.amount
    },
    getSelectedString () {
    // return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${this.rows.length}`
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      listsProducts: 'storePush/countProductGetter'
      // ...
    })
  },
  setup () {
    const selected = ref([])
    return {
      selected,
      small: ref(false)
    }
  }
}
</script>
<style>
  .list-card{
    margin-top: 45px;
  }
  .card-products{
    width: 31%;
    min-height: 38em;
  }
  .q-carousel{
    max-height: 300px;
  }
</style>
