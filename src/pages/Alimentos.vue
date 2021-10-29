<template>
  <q-page >
    <div class="q-pa-md">
      <header-lists-products></header-lists-products>
      <lists-products menu="ALIMENTOS"></lists-products>
      <div class="col-xs-12 col-md-3 col-lg-3 ">
        <filters-search></filters-search>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import listsProducts from '../components/ListsProducts.vue'
import headerListsProducts from '../components/headerListsProducts'
export default defineComponent({
  name: 'PageIndex',
  components: { listsProducts, headerListsProducts }
})
</script>
