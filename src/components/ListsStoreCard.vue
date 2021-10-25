<template>
  <q-page class="q-pa-md list-card">
    <h1 class="title-card-store">Carrito de compra</h1>
    <q-markup-table flat bordered>
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
      <tr v-for="(product,index) in listsProducts" :key="product.id">
        <td class="text-left text-description">
          <q-img :src="product.url_img" style="height: 100px; max-width: 100px"/>
          {{product.description}}
        </td>
        <td class="text-center">
          <div class="input-group" >
            <span @click="removeUnitProduct" class="input-group-addon"><q-icon name="chevron_left" color="primary"></q-icon></span>
            <input type="text" class="form-control" v-model="product.amount"  >
            <span  @click="addUnitProduct" class="input-group-addon"><q-icon name="chevron_right" color="primary"></q-icon></span>
          </div>
        </td>
        <td class="text-center styleNumberProduct">{{formatPrice(product)}}</td>
        <td class="text-center styleNumberProduct">{{product.discount}}</td>
        <td class="text-center styleNumberProduct">{{product.total}}</td>
        <td class="text-center">
          <q-item-label class="text-red-delete"   @click="deleteUnitProductCard(index)"><q-icon name="delete_outline" size="md"></q-icon> Eliminar</q-item-label>
        </td>
      </tr>
      </tbody>
    </q-markup-table>
    <div class="q-mt-md">
     <div class="row">
       <div class="col-2 col-md-2 col-sm-12"><q-btn class="" @click="clearListCard">Vaciar El carrito</q-btn></div>
       <div class="col-6 col-md-6 col-sm-12 text-right">
         <q-card class="no-shadow col-6 col-md-6 col-sm-12 ">
           <q-list bordered style="font-size: 2em; color: #2C2B7C; font-weight: bold">
             <q-item  class="q-my-sm" >
               <q-item-section >
                 Subtotal:
               </q-item-section>

               <q-item-section>
                 <q-item-label>{{totalesCard.subtotal}}</q-item-label>
               </q-item-section>

             </q-item>
             <q-item  class="q-my-sm" >
               <q-item-section >
                 Descuento:
               </q-item-section>

               <q-item-section>
                 <q-item-label>{{totalesCard.discount}}</q-item-label>
               </q-item-section>

             </q-item>
             <q-item  class="q-my-sm" >
               <q-item-section >
                 IVA:
               </q-item-section>

               <q-item-section>
                 <q-item-label>{{totalesCard.totalIva}}</q-item-label>
               </q-item-section>

             </q-item>

             <q-separator />
             <q-item  class="q-mb-sm" >
               <q-item-section  class="text-right ">Total:
               </q-item-section>

               <q-item-section class="q-mb-sm">
                 {{totalesCard.total}}
               </q-item-section>
             </q-item>
           </q-list>
              </q-card>
       </div>
<div class="col-3 col-md-3 col-sm-12 ">
  <q-card class="no-shadow ">
    <q-section-card>
      <q-btn class="bg-primary" >Generar pedido</q-btn>
    </q-section-card>
  </q-card></div>
     </div>
    </div>
    <q-dialog
      v-model="small"
    >
      <q-card style="width: 150px">
        <q-card-section>
          <q-input @change="updateAmount" :dense="dense" type="number" v-model="data.amount"/>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn icon="remove_shopping_cart" flat label="Listo" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { mapGetters } from 'vuex'
import { api } from 'boot/axios'
export default {
  data () {
    return {
      data: {
        amount: 0
      }
    }
  },
  mounted () {
    this.$store.dispatch('storePush/setUpdateState')
  },
  methods: {
    deleteUnitProductCard (row) {
      this.listsProducts.product.split(row)
      this.$store.dispatch('storePush/updateProductAction', this.listsProducts.product)
    },
    updateAmount (row) {
      console.log(row)
      this.$store.dispatch('storePush/updateProductAction', this.data)
    },
    removeUnitProduct (product) {
      if (product.amount > 1) {
        product.amount--
      } else {
        this.$q.notify('No se puede menos de una unidad')
      }
    },
    async addUnitProduct (product) {
      const result = await api.get('/products/consult-products/' + this.$route.params.id)
      if (result.inventory.amount > product.amount) {
        product.amount++
      } else {
        this.$q.notify('No hay mas Inventario')
      }
    },
    clearListCard () {
      this.$store.dispatch('storePush/deleteProductAction')
    },
    formatPrice (product) {
      return parseFloat(product.price).toFixed(0)
    },
    selectAmount (product) {
      this.data.amount = this.updateAmountProduct()
    },
    getSelectedString () {
    // return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${this.rows.length}`
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      listsProducts: 'storePush/countProductGetter',
      totalesCard: 'storePush/getTotalCardGetter'
      // ...
    })
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
  .list-card{
    margin-top: 45px;
  }
  .q-table tbody td.text-description {
    font-size: 18px;
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
  .text-description {
    padding: 0px 6px;
    width: 248px;
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
    border-radius: 50%;
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
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #2C2B7C;
    border-radius: 50%;
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
</style>
