<template>
  <div class="row lists-products " >
      <div ref="myListRef" class=" lists-products-page row justify-center">
        <q-infinite-scroll  :offset="550">
          <div
            v-for="product in listsProducts"
            :key="product.id"
            class="product-item "
          >
            <div v-if="product.inventory.amount > 0">
              <q-list separator>
                <q-slide-item>
                  <router-link  class="img-lists-product"  :to="`${this.$route.fullPath}/${product.id}`" >
                    <img v-if="product.url_img" :src="product.url_img" class="" :alt="product.description" :title="product.description"/>
                    <!--<img :src="product.url_img2" class="responsive " style="display: none"  />-->
                    <icon v-else name="add_photo_alternate">No tiene Imagen</icon>
                  </router-link>
                  <q-card-section>
                    <div class="row items-center no-wrap">
                      <div class="text-h6 text-center details-product">
                        <router-link class="container-product-item" :to="`/image-producto/${product.id}`"
                                     :title="product.description">{{product.description}}
                        </router-link>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <template v-if="product.iva > 0">
                      <div  class="text-center price-lists">
                        *₡ {{price(product)}}
                      </div>
                      <i>*Precio con Iva incluido</i>
                    </template>
                    <div v-else class="text-center price-lists">
                      ₡ {{price(product)}}
                    </div>
                  </q-card-section>
                  <q-card-actions class="text-center items-center justify-center ">
                    <q-btn  icon="shopping_cart" @click="send(product)" standout color="primary"
                           label="Agregar"/>
                  </q-card-actions>
                </q-slide-item>
              </q-list>
            </div>
            <div v-else class="disabled bg-green">
              <q-list separator >
                <q-slide-item>
                  <q-btn class="img-lists-product " style=" width: 100%;   display: flex;
    justify-content: center;
    align-items: center;" unelevated to="" append>
                    <img :src="product.url_img" class="" :alt="product.description" :title="product.description"/>
                    <!--<img :src="product.url_img2" class="responsive " style="display: none"  />-->
                  </q-btn>
                  <q-card-section>
                    <div class="row items-center no-wrap">
                      <div class="text-h6 text-center details-product">
                        <router-link  class="container-product-item" to=""
                                     :title="product.description">{{product.description}}
                        </router-link>

                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <template v-if="product.iva > 0">
                      <div  class="text-center price-lists">
                        *₡ {{price(product)}}
                      </div>
                      <i >*Precio con Iva incluido</i>
                    </template>
                    <div v-else class="text-center price-lists">
                      ₡ {{price(product)}}
                    </div>
                  </q-card-section>
                  <q-card-actions class="text-center items-center justify-center ">
                    <q-btn   icon="shopping_cart" @click="send(product)"  standout  color="primary"
                           label="Agregar"/>
                  </q-card-actions>
                </q-slide-item>
              </q-list>
            </div>
          </div>
        </q-infinite-scroll>
      </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
export default defineComponent({
  name: 'ListsProducts',
  props: {
    menu: {
      type: String,
      required: true
    }
  },
  components: { },
  data () {
    return {
      listsProducts: [],
      metho: 'Unidad',
      amount: 1
    }
  },
  created () {
    api.get('/products/lists-products/' + this.menu).then((response) => {
      if (response.status === 200) {
        this.listsProducts = response.data
      }
    })

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
