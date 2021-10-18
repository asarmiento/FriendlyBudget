<template>
  <q-page >
    <div class="q-pa-md">
      <div class="q-stepper--bordered">
        <lists-products menu="ALIMENTOS"></lists-products>
      </div>
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
