<template>
  <q-page >
    <header-lists-products></header-lists-products>
    <lists-products menu="BEBIDAS SIN ALCOHOL"></lists-products>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import listsProducts from '../components/ListsProducts.vue'
import headerListsProducts from '../components/headerListsProducts'
export default defineComponent({
  name: 'bebidaSinAlcoholPage',
  components: { listsProducts, headerListsProducts }
})
</script>
