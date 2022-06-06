<template>
  <div class="row lists-products " >
      <div class="row col-xs-12 col-md-4 col-lg-4 q-pa-md">
        <div class="container">
          <div class="container-title">
            <q-item-label class="title-name-menu">{{this.$route.name}}</q-item-label>
          </div>
          <div class="container-title">
            <q-item-label class="data-name-menu"><strong>{{listsProducts.length}}</strong> PRODUCTOS ENCONTRADOS
            </q-item-label>
          </div>
        </div>
      </div>
      <div class="row col-xs-12 col-md-4 col-lg-4 q-pa-md">
            <q-select filled v-model="brand" :options="listsBrands"
                      @update:model-value="filterListsBrand"
                      label="Filtrar por Marcas"
                      option-value="value"
                      option-label="label"
                      style="min-width: 100%;"
                      clearable
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
      </div>
      <div class="row col-xs-12 col-md-4 col-lg-4 q-pa-md">
            <q-select filled v-model="category" :options="listsCategories"
                      @update:model-value="filterListsCategory"
                      label="Filtrar por Categoría"
                      option-value="value"
                      option-label="label"
                      style="min-width: 100%;"
                      clearable
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
      </div>
      <div ref="myListRef" class=" lists-products-page row justify-center">
        <q-infinite-scroll  :offset="550">
          <div
            v-for="product in listsProducts.products"
            :key="product.id"
            class="product-item " >
            <div v-if="product.inventory.amount > 0">
              <q-list separator>
                <q-slide-item>
                  <router-link  class="img-lists-product"  :to="`${this.$route.fullPath}/${product.id}`" >
                    <img v-if="product.url_img" :src="product.url_img" class="" :alt="product.description" :title="product.description"/>
                    <!--<img :src="product.url_img2" class="responsive " style="display: none"  />-->
                    <template v-else>
                      <i class="far fa-eye-slash"></i>
                      <q-item-label>No tiene Imagen</q-item-label>
                    </template>
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
                  <q-card-section  class="text-center">
                    <template v-if="product.iva > 0">
                      <div  class="text-center price-lists">
                        *₡ {{price(product)}}
                      </div>
                      <i  class="text-center">*Precio con Iva incluido</i>
                    </template>
                    <template v-else>
                      <i  class="text-center">Exento</i>
                      <div  class="text-center price-lists">
                        ₡ {{price(product)}}
                      </div>
                    </template>
                  </q-card-section>
                  <q-card-actions class="text-center items-center justify-center ">
                    <q-input rounded outlined type="number"
                             input-class="text-center"
                             bottom-slots v-model="amount">
                      <template v-slot:prepend>
                        <q-btn rounded color="primary" @click="decrementar">-</q-btn>
                      </template>
                      <template v-slot:append>
                        <q-btn rounded color="primary" @click="incrementar">+</q-btn>
                      </template>
                    </q-input>
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
                  <q-card-section  class="text-center">
                    <template v-if="product.iva > 0">
                      <div  class="text-center price-lists">
                        *₡ {{price(product)}}
                      </div>
                      <i  class="text-center">*Precio con Iva incluido</i>
                    </template>
                    <template v-else>
                      <i  class="text-center">Exento</i>
                      <div  class="text-center price-lists">
                      ₡ {{price(product)}}
                    </div>
                    </template>
                  </q-card-section>
                  <q-card-actions class="text-center items-center justify-center ">
                    <q-input rounded outlined type="number"
                             input-class="text-center"
                             bottom-slots v-model="amount">
                      <template v-slot:prepend>
                        <q-btn rounded color="primary" @click="decrementar">-</q-btn>
                      </template>
                      <template v-slot:append>
                        <q-btn rounded color="primary" @click="incrementar">+</q-btn>
                      </template>
                    </q-input>
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
import { mapGetters } from 'vuex'
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
      metho: 'Unidad',
      amount: 1,
      brand: '',
      category: ''
    }
  },
  created () {
    this.$store.dispatch('storePush/getListsProducts', this.menu)
    this.$store.dispatch('storePush/listsBrandsProductsActions', { menu: this.menu })
    this.$store.dispatch('storePush/listsCategoriesProductsActions', { menu: this.menu })

    this.$store.dispatch('storePush/setUpdateState')
  },
  computed: {
    ...mapGetters({
      listsProducts: 'storePush/getListsProductsGetter',
      listsCategories: 'storePush/listsCategoriesGetter',
      listsBrands: 'storePush/listsBrandsGetter'
    })
  },
  methods: {

    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.listSearchSelect = this.listSearchSelect.filter(v => v.description.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },
    async filterListsCategory () {
      if (this.category) {
        await this.$store.dispatch('storePush/filterCategoriesProductsActions', { category: this.category, menu: this.menu })
      } else {
        this.$store.dispatch('storePush/getListsProducts', this.menu)
      }
    },
    async filterListsBrand () {
      if (this.brand) {
        await this.$store.dispatch('storePush/filterBrandsProductsActions', { brand: this.brand, menu: this.menu })
      } else {
        this.$store.dispatch('storePush/getListsProducts', this.menu)
      }
    },
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
      this.amount = 1
    },
    incrementar () {
      if (this.product.inventory.amount > this.amount) {
        this.amount++
      } else {
        this.$q.notify('No hay mas Inventario')
      }
    },
    decrementar () {
      if (this.amount > 1) {
        this.amount--
      } else {
        this.$q.notify('No se puede menos de una unidad')
      }
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
