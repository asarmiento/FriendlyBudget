<template>
  <q-page >
        <header-lists-products></header-lists-products>
        <lists-products menu="CERVEZAS Y BEBIDAS ALCOHOLICAS"></lists-products>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import listsProducts from '../components/ListsProducts.vue'
import headerListsProducts from '../components/headerListsProducts'
export default defineComponent({
  name: 'CervezasYBebidasAlcoholicas',
  components: { listsProducts, headerListsProducts }
})
</script>
