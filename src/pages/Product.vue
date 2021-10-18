<template>
  <q-page>
    <div class="q-pa-lg row items-start q-gutter-lg">
      <q-card class="my-card bg-grey-1 card-products">
        <q-card-section style="height: 350px; width: 100%">
          <img :src="product.url_img" class="responsive" srcset/>
        </q-card-section>
      </q-card>
      <q-separator vertical/>
      <q-card flat div style="width: 400px; display: flex; justify-content: center; align-items: center;">
        <div class="row">
          <q-card-sectio class="col-md-12"><h4>{{product.description}}</h4></q-card-sectio>
          <q-card-sectio class="col-md-12 text-center">
            <label style="font-size: 24px"><i>Precio*:</i> <strong> ₡{{money}}</strong></label>
          </q-card-sectio>
          <q-card-sectio class="col-md-12 text-center">
            <div class=" col-md-12 text-center form-group">
              <label>SELECCIONE PRESENTACIÓN</label>
              <q-select rounded outlined v-model="metho" :options="options"/>
            </div>
          </q-card-sectio>
          <q-card-sectio class="col-md-12 text-center">
            <div class=" col-md-12 text-center form-group">
              <label>SELECCIONE CANTIDAD</label>
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
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'DetailProduct',
  data () {
    return {
      product: '',
      metho: '',
      amount: 1,
      options: ['Unidad', 'Caja o Paquetes'],
      lineaProduct: []
    }
  },
  computed: {
    money () {
      return parseFloat(this.product.sale_price).toFixed(2)
    }
  },
  created () {
    api.get('/products/consult-products/' + this.$route.params.id).then(response => {
      this.product = response.data
      console.log(this.product.inventory)
    })
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
        price: this.product.sale_price,
        rate: this.product.iva,
        code_iva: this.product.code_iva,
        tariff_iva: this.product.tarifa_iva,
        unit_product_id: this.product.sale_method_id,
        type_activity_id: this.product.type_activity_id,
        url_img: this.product.url_img,
        description: this.product.description
      }
      console.log(lineaProduct)
      await this.$store.dispatch('storePush/addProductAction', lineaProduct)
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
<style>
  .q-card {
    width: 50%;
  }

  img.responsive {
    height: 450px;
  }
</style>
