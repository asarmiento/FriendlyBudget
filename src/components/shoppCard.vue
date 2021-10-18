<template>
  <q-btn round  flat dense  icon="shopping_cart" to="/list-card" class="q-ml-md">
    <q-badge v-if="countProducts" color="red" floating>{{countProducts.length}}</q-badge>
    <q-tooltip v-if="countProducts"
               :target="true"
               anchor="bottom left"
               transition-show="rotate"
               transition-hide="rotate"
               class="bg-white text-primary">
      <div class="q-pa-md" style="max-width: 350px">
        <q-list  >
          <div v-for="product in countProducts" :key="product.id">
            <q-item  clickable v-ripple >
              <q-item-section avatar>
                <q-avatar rounded>
                  <img :src="product.url_img">
                </q-avatar>
              </q-item-section>
              <q-item-section>{{product.description}}</q-item-section>
              <q-item-section>Cant. {{product.amount}}</q-item-section>
            </q-item><q-separator />
          </div>
        </q-list>
      </div>
    </q-tooltip>
  </q-btn>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  name: 'shoppCard',
  data () {
    return {
      listsProducts: []
    }
  },
  mounted () {},
  computed: {},
  setup () {
    const countProducts = computed(() => JSON.parse(localStorage.getItem('productsCard')))
    console.log('main', countProducts, JSON.parse(localStorage.getItem('productsCard')))
    return {
      basic: ref(false),
      countProducts
    }
  }
})
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
