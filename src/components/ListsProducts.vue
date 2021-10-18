<template>
<div class="q-pa-md row items-start q-gutter-md">
  <q-card
    flat
    bordered
    v-for="product in listsProducts"
    :key="product" class="my-card bg-grey-1 card-products">
    <q-btn unelevated  :to="`/image-producto/${product.id}`" append >
          <img :src="product.url_img" class="responsive" />
       <!--<img :src="product.url_img2" class="responsive " style="display: none"  />-->
    </q-btn>
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6 text-center">{{product.description}}</div>
          <div class="text-subtitle2 text-center">{{product.sub_family}}</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="text-center">
      ₡ {{product.sale_price}}
    </q-card-section>

    <q-separator />

    <q-card-actions class="text-center items-center justify-center absolute-bottom">
      <q-btn unelevated icon="shopping_cart" @click="send(product)" rounded color="primary" label="Agregar" />
    </q-card-actions>
  </q-card>
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
        console.log(this.listsProducts[0])
      }
      console.log(response.data)
    })
  },
  mounted () {
  },
  methods: {
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
    }
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
