<template>
  <q-page >
    <lists-products menu="VINOS Y DESTILADOS"></lists-products>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import listsProducts from '../components/ListsProducts.vue'
export default defineComponent({
  name: 'VinosYDestiladosPage',
  components: { listsProducts }
})
</script>
