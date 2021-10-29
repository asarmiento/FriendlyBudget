<template>
    <div class="row justify-center box-product-unit">
      <q-card class=" no-shadow col-md-4  ">
        <q-img :src="product.url_img" class=" img-unit "   style="height: 280px; max-width: 80%" />
      </q-card>

      <div  style="width: 17%; display: flex; justify-content: right; align-items: center; margin-top: -59px; margin-right: 15px; margin-left: 5%">
        <q-separator vertical/>
        <div class="row " style="margin-left: 2%">
          <q-card-section class="col-md-12 desription-product text-center">{{product.description}}</q-card-section>
          <q-card-section class="col-md-12 text-center">
            <q-item-label style="font-size: 18px; padding: 3px"><i>Precio Caja*:</i> <strong class="price-box"> ₡{{boxMoney}}</strong></q-item-label>
            <q-item-label style="font-size: 18px; padding: 3px"><i>Precio Unitario*:</i> <strong class="price-unite"> ₡{{money}} </strong></q-item-label>
          </q-card-section>
          <q-card-sectio class="col-md-12 text-center"  style="display: block; padding: 5px 0 4px 0;">
            <div class=" col-md-12 text-center form-group" >
              <q-item-label class="text-bold">SELECCIONE PRESENTACIÓN</q-item-label>
                <q-select rounded outlined v-model="metho" :options="options"/>
            </div>
          </q-card-sectio>
          <q-card-sectio class="col-md-12 text-center "  style="display: block; padding: 5px 0 4px 0">
            <div class=" col-md-12 text-center form-group">
              <q-item-label  class="text-bold">SELECCIONE CANTIDAD</q-item-label>
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
            </div>
          </q-card-sectio>

          <q-card-sectio class="col-md-12 text-center">
            <div class=" col-md-12 text-center form-group">
              <q-btn rounded outlined color="primary" style="width: 100%" @click="send">
                Comprar
              </q-btn>
            </div>
          </q-card-sectio>

          <q-card-sectio class="col-md-12 text-center" style="margin-top: 26px">
            <div class=" col-md-12 text-center form-group">
              <i><strong>* IVI</strong> (Impuestos de venta incluidos)</i>
            </div>
          </q-card-sectio>
        </div>
      </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'DetailProduct',
  data () {
    return {
      product: '',
      metho: 'Unidad',
      amount: 1,
      options: ['Unidad', 'Caja o Paquetes'],
      lineaProduct: [],
      rutaBack: ''
    }
  },
  computed: {
    money () {
      return parseFloat(this.product.sale_price).toFixed(2)
    },
    boxMoney () {
      return parseFloat(this.product.sale_price).toFixed(2) * this.product.units_per_box
    }
  },
  created () {
    api.get('/products/consult-products/' + this.$route.params.id).then(response => {
      this.product = response.data
      this.$store.dispatch('storePush/setProduct', this.product)
    })
    this.$store.dispatch('storePush/setUpdateState')
    this.rutaBack = this.$route.params.route
    console.log('ruta', this.$route)
  },
  methods: {
    async send () {
      if (this.metho === '') {
        this.$q.notify('Debe seleccionar la presentación')
        return false
      }
      if (this.metho === 'Caja o Paquetes') {
        this.amount = this.product.units_per_box * this.amount
      }
      const lineaProduct = {
        product_id: this.product.id,
        code_cabys: this.product.code_cabys,
        amount: this.amount,
        discount: 0,
        price: this.product.sale_price,
        total: parseFloat(this.product.sale_price) * parseFloat(this.amount),
        rate: this.product.iva,
        code_iva: this.product.code_iva,
        tariff_iva: this.product.tarifa_iva,
        unit_product_id: this.product.sale_method_id,
        type_activity_id: this.product.type_activity_id,
        url_img: this.product.url_img,
        description: this.product.description
      }

      await this.$store.dispatch('storePush/addProductAction', lineaProduct)
      await this.$store.dispatch('storePush/setUpdateState')
      this.$q.notify('Se agrego con éxito')
      this.$router.push(`/${this.$route.params.route}`)
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
  }
})
</script>
<style scoped>
  .q-img__image
  {
    width: 80%;
  }
</style>
