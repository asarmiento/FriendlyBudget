<template>
  <q-page>
    <lists-store-card></lists-store-card>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'
import listsStoreCard from '../components/ListsStoreCard'
export default defineComponent({
  name: 'lists-card',
  components: { listsStoreCard }
})
</script>
