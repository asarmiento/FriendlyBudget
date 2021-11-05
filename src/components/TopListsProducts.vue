<template>
  <div class="row lists-products " >
      <div ref="myListRef" class=" lists-products-page row justify-center">
        <q-infinite-scroll  :offset="550" v-if="listsTopIndexProducts">
          <div
            v-for="product in listsTopIndexProducts.data"
            :key="product.id"
            class="product-item-top "
          >
            <q-list separator>
                <q-slide-item>
                  <q-btn  class="img-lists-product" unelevated :to="`/image-producto/${product.id}`" append>
                    <img v-if="product.url_img" :src="product.url_img" class="" :alt="product.descripcion" :title="product.descripcion"/>
                    <!--<img :src="product.url_img2" class="responsive " style="display: none"  />-->
                    <template v-else>
                      <i class="far fa-eye-slash"></i>
                      <q-item-label>No tiene Imagen</q-item-label>
                    </template>
                  </q-btn>
                  <q-card-section>
                    <div class="row items-center no-wrap">
                      <div class="text-h6 text-center details-product">
                        <router-link class="container-product-item" :to="`/image-producto/${product.id}`"
                                     :title="product.descripcion">{{product.descripcion}}
                        </router-link>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-center price-lists-top">
                      ₡ {{price(product)}}
                    </div>
                  </q-card-section>
                </q-slide-item>
              </q-list>
          </div>
        </q-infinite-scroll>
      </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ListsTopProducts',
  props: {
    listsTopIndexProducts: {
      required: true
    }
  },
  components: { },
  data () {
    return {
      metho: 'Unidad',
      amount: 1
    }
  },
  created () {
    this.$store.dispatch('storePush/setUpdateState')
  },
  updated () {
  },
  methods: {
    price (product) {
      return parseFloat(product.sale_price).toFixed(0)
    },
    async send (product) {
      console.log(product)
      if (this.metho === '') {
        this.$q.notify('Debe seleccionar la presentación')
        return false
      }
      const lineaProduct = {
        product_id: product.id,
        code_cabys: product.code_cabys,
        amount: this.amount,
        price: product.sale_price,
        rate: product.iva,
        code_iva: product.code_iva,
        tariff_iva: product.tarifa_iva,
        discount: 0,
        unit_product_id: product.sale_method_id,
        type_activity_id: product.type_activity_id,
        url_img: product.url_img,
        total: product.sale_price * this.amount,
        description: product.description
      }
      console.log(lineaProduct)
      await this.$store.dispatch('storePush/addProductAction', lineaProduct)
      await this.$store.dispatch('storePush/setUpdateState')
      this.$q.notify('Se ha agredado con éxito al carro de compra')
    }
  },

  setup () {
    const items = ref([{}])
    return {
      items,
      onLoad (index, done) {
        setTimeout(() => {
          items.value.push({}, {}, {}, {}, {}, {}, {})
          done()
        }, 2000)
      }
    }
  }
})
</script>
<style >

</style>
