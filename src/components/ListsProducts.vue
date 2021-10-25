<template>
  <div class="row lists-products ">
    <div class="col-xs-12 col-md-3 col-lg-3 ">
      <filters-search></filters-search>
    </div>
    <div class="row col-xs-12 col-md-9 col-lg-9 ">
      <div class="container">
        <div class="container-title">
          <q-item-label class="title-name-menu">{{this.$route.name}}</q-item-label>
        </div>
      </div>
      <div class="container">
        <div class="container-title">
          <q-item-label class="data-name-menu"><strong>{{listsProducts.length}}</strong> PRODUCTOS ENCONTRADOS
          </q-item-label>
        </div>
      </div>
      <div ref="myListRef" class="lists-products-page row justify-center">
        <q-infinite-scroll @load="onLoad" :offset="250">
          <div
            v-for="product in listsProducts"
            :key="product.id"
            class="product-item"
          >
            <div v-if="product.inventory.amount > 0">
              <q-list separator>
                <q-slide-item>
                  <q-btn  class="img-lists-product" unelevated :to="`/image-producto/${product.id}`" append>
                    <img v-if="product.url_img" :src="product.url_img" class="" :alt="product.description" :title="product.description"/>
                    <!--<img :src="product.url_img2" class="responsive " style="display: none"  />-->
                    <icon v-else name="add_photo_alternate">No tiene Imagen</icon>
                  </q-btn>
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
                    <div class="text-center price-lists">
                      ₡ {{price(product)}}
                    </div>
                  </q-card-section>
                  <q-card-actions class="text-center items-center justify-center ">
                    <q-btn unelevated icon="shopping_cart" @click="send(product)" rounded color="primary"
                           label="Agregar"/>
                  </q-card-actions>
                </q-slide-item>
              </q-list>
            </div>
            <div v-else class="disabled bg-green">
              <q-list separator>
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
                    <div class="text-center price-lists">
                      ₡ {{price(product)}}
                    </div>
                  </q-card-section>
                  <q-card-actions class="text-center items-center justify-center ">
                    <q-btn unelevated disabled icon="shopping_cart" @click="send(product)" rounded color="primary"
                           label="Agregar"/>
                  </q-card-actions>
                </q-slide-item>
              </q-list>
            </div>
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md ">
              <div class="col-lg-12 justify-center">
                <q-spinner-dots color="primary" size="50px"/>
              </div>
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
import filtersSearch from './filtersSearch'
export default defineComponent({
  name: 'ListsProducts',
  props: {
    menu: {
      type: String,
      required: true
    }
  },
  components: { filtersSearch },
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
  .q-card__section--vert{
    padding: 5px;
  }
  .lists-products{
    clear: both;
    margin-top: 10rem;
    margin-bottom: 10rem !important;
  }
  *{
    box-sizing: border-box;
  }

  .card-products{
    width: 24%;
    min-height: 38rem;
  }
  .lists-products-page{
    padding-left: 0;
    list-style: none;
    margin: 22px 0 0 0;
    display: flex;
    flex-wrap: wrap;
  }
  .q-carousel{
    max-height: 300px;
  }
  img.responsive {
    height: 25rem;
  }
  .price-lists {
    font-family: 'Montserrat', sans-serif;
    color: #321481;
    font-weight: bold;
    position: relative;
    background-color: #fff;
    font-size: 14px;
    margin: 6px 0 0 0;
    width: 100%;
    text-align: center;
    display: block;
  }
  .container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 10px;
    padding-right: 10px;
  }
  .img-lists-product{
    display: block;
    margin-bottom: 10px;
    text-align: center;
    height: 180px;
    overflow: hidden;
    position: relative;
  }
  .img-lists-product img{
    width: 100%;
    height: auto;
    max-width: 140px;
    vertical-align: middle;
    border: 0;
  }
  .details-product {
    height: 39px;
    text-align: center;
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    display: inline-block;
    -webkit-flex: 0 0 auto;
    -moz-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .container-stamps {
    width: 100%;
    height: 40px;
    position: relative;
    z-index: 9;
    top: 0px;
    right: 19px;
  }
  .container-product-item {
    width: auto;
    padding: 15px 0 0 0;
    text-decoration: none;
  }
  .title-name-menu {
    color: #333333;
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    text-align: left;
  }
  .data-name-menu {
    color: #333333;
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    text-transform: uppercase;
    text-align: left;
  }
  .container-title{
    display: block;
  }
  .product-item {
    float: left;
    width: 50%;
    position: relative;
    min-height: 1px;
    padding: 20px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .product-item:first-child {
    margin-left: -1px;
  }
  @media (min-width: 640px){
    .container {
      width: 100%;
    }
    .product-item {
      float: left;
      width: 25%;
    }
    .product-item:nth-child(4n+1) {
      clear: both;
    }
  }
  @media (min-width: 1024px){
    .container {
      width: 1024px;
    }
    .product-item {
      float: left;
      width: 25%;
    }
  }
  @media (min-width: 1400px){
    .container {
      width: 1400px;
    }
    .product-item {
      float: left;
      width: 25%;
    }
  }
</style>
