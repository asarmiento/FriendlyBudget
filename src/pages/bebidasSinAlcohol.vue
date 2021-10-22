<template>
  <q-page >
    <lists-products menu="BEBIDAS SIN ALCOHOL"></lists-products>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import listsProducts from '../components/ListsProducts.vue'
export default defineComponent({
  name: 'bebidaSinAlcoholPage',
  components: { listsProducts }
})
</script>
