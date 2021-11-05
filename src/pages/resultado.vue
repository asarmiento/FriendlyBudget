<template>
  <q-page >
    <div class="q-pa-md">
      <lists-products :menu="this.route.params.result"></lists-products>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import listsProducts from '../components/ListsProducts.vue'
export default defineComponent({
  name: 'PageIndex',
  components: { listsProducts }
})
</script>
