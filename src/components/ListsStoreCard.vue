<template>
  <q-page class="q-px-md  list-card">
    <div class="row list-card__title">
      <div class="col-md-4 col-sm-12">Carrito de compra</div>
      <div class="col-md-4 col-sm-12" v-if="getCustomer">Día de entrega de pedidos los: {{getCustomer.visit_day}}</div>
      <div class="col-md-4 col-sm-12">Número de pedido: {{getNumeration.consecutive}}</div>

    </div>
    <div class="row list-card__title">
      <q-item-card class="breadPayment" style="display: none">
        Para pagos puedes realizar Sinpe Movil <strong>87479284</strong>
      </q-item-card>
    </div>
    <q-card class="list-card__box-products" v-for="(product) in listsProducts" :key="product.id">
      <q-card-section class="bg-primary text-white text-center">
            Productos
      </q-card-section>
      <q-separator />
      <q-card-section class="text-center">
        <q-img :src="product.url_img" style="height: 100px; max-width: 100px"/>
      </q-card-section>
      <q-card-section class="text-center">{{product.description}}</q-card-section>
      <q-card-section class=" list-card__box-products__buttoms-au-dow ">
        <div class="input-group">
            <span @click="removeUnitProduct(product)" class="input-group-addon">
              <q-icon name="chevron_left" color="primary"></q-icon>
            </span>
        <input type="text" class="form-control" v-model="product.amount">
        <span @click="addUnitProduct(product)" class="input-group-addon">
          <q-icon name="chevron_right" color="primary" push></q-icon>
        </span>
      </div>
      </q-card-section>

      <q-card-section class="text-center list-card__box-products__description">
        <span class="list-card__box-products__description__span">
          Precio Unid.: {{formatPrice(product)}}
        </span>
        <q-separator />
        <span class="list-card__box-products__description__span">
          Descuento: {{formatTotal(product.discount)}}
        </span>
        <q-separator />
        <span class="list-card__box-products__description__span">
          Total: {{formatTotal(product.total)}}
        </span>
      </q-card-section>
    </q-card>
    <q-markup-table class="list-card__table" flat bordered>
      <thead class="bg-primary text-white">
      <tr>
        <th class="text-center">Productos</th>
        <th class="text-center">Cantidad</th>
        <th class="text-center">Precio x Unidad</th>
        <th class="text-center">Descuento</th>
        <th class="text-center">Total</th>
        <th class="text-center"></th>
      </tr>
      </thead>
      <tbody class="bg-white text-primary">
      <tr v-if="loading">
        <td colspan="6" class="text-center">
          <q-circular-progress
          indeterminate
          size="90px"
          :thickness="0.4"
          color="primary"
          center-color="grey-8"
          track-color="transparent"
          class="q-ma-md"
        /></td>
      </tr>
      <template  v-if="!loading">
      <tr v-for="(product,index) in listsProducts" :key="product.id">
        <td class="text-left text-description ">
          <q-img :src="product.url_img" style="height: 100px; max-width: 100px"/>
          {{product.description}}
        </td>
        <td class="text-left flex justify-start styleButtonProduct ">
          <div class="input-group">
            <span @click="removeUnitProduct(product)" class="input-group-addon"><q-icon name="chevron_left"
                                                                               color="primary"></q-icon></span>
            <input type="text" class="form-control" v-model="product.amount">
            <span @click="addUnitProduct(product)" class="input-group-addon"><q-icon name="chevron_right" color="primary"
                                                                            push></q-icon></span>
          </div>
        </td>
        <td class="text-center text-primary styleNumberProduct">{{formatPrice(product)}}</td>
        <td class="text-center text-primary styleNumberProduct">{{formatTotal(product.discount)}}</td>
        <td class="text-center text-primary styleNumberProduct">{{formatTotal(product.total)}}</td>
        <td class="text-center">
          <q-item-label class="text-red-delete" @click="deleteUnitProductCard(index)">
            <q-icon name="delete_outline" size="md"></q-icon>
            Eliminar
          </q-item-label>
        </td>
      </tr>
      </template>
      </tbody>
    </q-markup-table>
    <q-card-section class="q-mt-md list-card__info-total" style="">
        <div class="row">
          <div class=" col-md-2 col-sm-12 list-card__info-total__clear-card">
            <q-btn class="no-wrap bg-grey-2 text-primary" @click="clearListCard" push>Vaciar El carrito</q-btn>
          </div>
          <div class="list-card__info-total__data-credit"   v-if="getCustomer.credit_limit > 0">
            <q-list class="q-mt-md q-mr-sm shadow-7 text-primary ">
              <h6 style="margin: 0px;"> Información de Crédito</h6>
              <q-item   v-ripple>
                <q-item-section no-wrap>Limite de Crédito: {{getCustomer.credit_limit}}</q-item-section>
              </q-item>

              <q-item  v-ripple>
                <q-item-section no-wrap>Saldo Pendiente: {{getCustomer.due}}</q-item-section>
              </q-item>

              <q-item  v-ripple>

                <q-item-section no-wrap>Saldo disponible: {{formatTotal(Number(getCustomer.credit_limit)- Number(getCustomer.due))}}</q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="list-card__info-total__totals">
            <q-card class="no-shadow   ">
              <q-list bordered style="font-size: 1.5em; color: #2C2B7C; font-weight: bold">
                <q-item class="q-my-sm">
                  <q-item-section>
                    Subtotal:
                  </q-item-section>

                  <q-item-section>
                    <q-item-label v-if="totalesCard">{{formatTotal(totalesCard.subtotal)}}</q-item-label>
                  </q-item-section>

                </q-item>
                <q-item class="q-my-sm">
                  <q-item-section>
                    Descuento:
                  </q-item-section>

                  <q-item-section>
                    <q-item-label v-if="totalesCard">{{formatTotal(totalesCard.discount)}}</q-item-label>
                  </q-item-section>

                </q-item>
                <q-item class="q-my-sm">
                  <q-item-section>
                    IVA:
                  </q-item-section>

                  <q-item-section>
                    <q-item-label v-if="totalesCard">{{formatTotal(totalesCard.totalIva)}}</q-item-label>
                  </q-item-section>

                </q-item>

                <q-separator/>
                <q-item class="q-mb-sm">
                  <q-item-section class="text-right ">Total:
                  </q-item-section>

                  <q-item-section class="q-mb-sm" v-if="totalesCard">
                    {{formatTotal(totalesCard.total)}}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
            <div v-if="!loading" class="col-3 col-md-3 col-sm-12 ">
              <q-card class="no-shadow ">
                <q-card-section dense>
                  <q-btn @click="send(listsProducts,totalesCard)" class="bg-primary no-wrap" text-color="white" push>Generar pedido</q-btn>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
    </q-card-section>

  </q-page>
</template>

<script>
import { ref } from 'vue'
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      data: {
        amount: 0
      },
      loading: false
    }
  },
  created () {
    this.$store.dispatch('authModules/tryNumerationAction')
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      listsProducts: 'storePush/countProductGetter',
      totalesCard: 'storePush/getTotalCardGetter',
      getNumeration: 'authModules/numerationGetter',
      getCustomer: 'authModules/CustomerGetter',
      messageResponse: 'storePush/getMessageGetter'
      // ...
    }),
    ...mapState({
    })
  },
  mounted () {
    this.$store.dispatch('storePush/setUpdateState')
  },
  methods: {
    deleteUnitProductCard (row) {
      this.$store.dispatch('storePush/deleteProductListsAction', row)
    },
    updateAmount (row) {
      console.log(row)
      this.$store.dispatch('storePush/updateProductAction', this.data)
    },
    async removeUnitProduct (product) {
      console.log(product)
      if (product.amount > 1) {
        await this.$store.dispatch('storePush/decreaseProductAction', product)
        this.$q.notify('Se ha diminuido la unidad')
      } else {
        this.$q.notify('No se puede menos de una unidad')
      }
    },
    async addUnitProduct (product) {
      console.log(product)
      if (product.amount > 0) {
        await this.$store.dispatch('storePush/increaseProductAction', product)
        console.log(this.$store.getters.listsProducts)
        this.$q.notify('Se ha aumentado una unidad')
      } else {
        this.$q.notify('No se puede menos de una unidad')
      }
    },
    clearListCard () {
      this.$store.dispatch('storePush/deleteProductAction')
    },
    formatPrice (product) {
      return parseFloat(Number(product.price)).toFixed(2)
    },
    formatTotal (product) {
      return parseFloat(Number(product)).toFixed(2)
    },
    selectAmount (product) {
      this.data.amount = this.updateAmountProduct()
    },
    async send (products, totals) {
      this.loading = true
      await this.$store.dispatch('storePush/sendDataPreSale', { products: products, totals: totals })
      this.$q.notify({
        spinner: true,
        message: 'Se envió con éxito',
        timeout: 2000
      })
      this.loading = false
      this.$router.push('/inicio')
    }
  },
  setup () {
    const selected = ref([])
    return {
      selected,
      small: ref(false)
    }
  }
}
</script>
<style>

  .q-table tbody td.text-description {
    font-size: 16px;
  }
  .text-red-delete{
    cursor: pointer;
    color: #EF4436;
  }
  .q-table thead th{
    font-weight: bold;
    font-size: 1.5em;
  }
  .q-table tbody td.styleNumberProduct{
    font-size: 16px;
    font-weight: bold;
    color: black;
  }
  .styleButtonProduct{
    width: 200px;
    height: 34px;
    padding: 5px;
    margin: 0;
  }
  .text-description {
    padding: 0px 6px;
    width: 228px;
    height: 34px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 4em;
    color: #2C2B7C;
    background-color: #ebebeb;
    margin: 0 0 35px 0;
  }
  .input-group-addon {
    background-color: #fff;
    border: 1px solid #2C2B7C;
    border-radius: 40%;
    color: inherit;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    padding: 6px 12px;
    text-align: center;
  }
  .spinner-buttons.input-group-btn .btn-xs {
    line-height: 1.13;
  }
  .spinner-buttons.input-group-btn {
    width: 20%;
  }
  .form-control,
  .single-line {
    background-color: #FFFFFF;
    background-image: none;
    border: 1px solid #2c2b7c !important;
    border-radius: 1px;
    color: #444447;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
  }
  .form-inline .input-group {
    display: inline-table;
    vertical-align: middle;
  }
  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
    width: 8rem;
    left: 6rem;
  }
  .input-group[class*="col-"] {
    float: none;
    padding-right: 0;
    padding-left: 0;
  }
  .input-group .form-control {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
  }
  .input-group .form-control:focus {
    z-index: 3;
  }
  .input-group-addon,
  .input-group-btn,
  .input-group .form-control {
    display: table-cell;
  }
  .input-group-addon:not(:first-child):not(:last-child),
  .input-group-btn:not(:first-child):not(:last-child),
  .input-group .form-control:not(:first-child):not(:last-child) {
    border-radius: 0;
  }
  .input-group-addon,
  .input-group-btn {
    width: 1%;
    white-space: nowrap;
    vertical-align: middle;
  }
  .input-group-addon {
    padding: 6px 12px;
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #2C2B7C;
    border-radius: 30%;
  }
  .input-group-addon.input-sm {
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 3px;
  }
  .input-group-addon.input-lg {
    padding: 10px 16px;
    font-size: 18px;
    border-radius: 6px;
  }
  .input-group-addon input[type="radio"],
  .input-group-addon input[type="checkbox"] {
    margin-top: 0;
  }
  .input-group .form-control:first-child,
  .input-group-addon:first-child,
  .input-group-btn:first-child > .btn,
  .input-group-btn:first-child > .btn-group > .btn,
  .input-group-btn:first-child > .dropdown-toggle,
  .input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),
  .input-group-btn:last-child > .btn-group:not(:last-child) > .btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-group-addon:first-child {
    border-right: 0;
  }
  .input-group .form-control:last-child,
  .input-group-addon:last-child,
  .input-group-btn:last-child > .btn,
  .input-group-btn:last-child > .btn-group > .btn,
  .input-group-btn:last-child > .dropdown-toggle,
  .input-group-btn:first-child > .btn:not(:first-child),
  .input-group-btn:first-child > .btn-group:not(:first-child) > .btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .input-group-addon:last-child {
    border-left: 0;
  }
  .input-group-btn {
    position: relative;
    font-size: 0;
    white-space: nowrap;
  }
  .input-group-btn > .btn {
    position: relative;
  }
  .input-group-btn > .btn + .btn {
    margin-left: -1px;
  }
  .input-group-btn > .btn:hover,
  .input-group-btn > .btn:focus,
  .input-group-btn > .btn:active {
    z-index: 2;
  }
  .input-group-btn:first-child > .btn,
  .input-group-btn:first-child > .btn-group {
    margin-right: -1px;
  }
  .input-group-btn:last-child > .btn,
  .input-group-btn:last-child > .btn-group {
    z-index: 2;
    margin-left: -1px;
  }
  .q-markup-table{
    width: 90%;
    left: 5%;
  }
</style>
