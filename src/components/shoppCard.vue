<template>
  <q-btn round  flat dense  icon="shopping_cart" to="/list-card" @click="updateState" size="lg" class="q-ml-md">
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
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'shoppCard',
  data () {
    return {
      listsProducts: []
    }
  },
  mounted () {
    this.$store.dispatch('storePush/setUpdateState')
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      countProducts: 'storePush/countProductGetter'
      // ...
    })
  },
  methods: {
    updateState () {
      this.$store.dispatch('storePush/setUpdateState')
    }
  },
  watch: {
  },
  setup () {
    return {
      basic: ref(false)
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
