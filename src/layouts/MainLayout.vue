<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="header-container " height-hint="98">
      <div class="q-pa-md header-info-search q-gutter-y-sm">
        <div class="row no-wrap shadow-1  ">
          <q-toolbar class="col-6 " style="border-radius: 4%; ">
            <q-avatar class="q-mr-md" size="4rem" >
              <img src="../assets/v4.0/FP-Iconoapp-01.png">
            </q-avatar>
            <q-toolbar-title v-if="totalesCard" class="text-white">
              Total Impuesto: {{formatTotal(totalesCard.totalTax)}}
            </q-toolbar-title>
            <q-toolbar-title v-else class="text-white">
              Total Impuesto: 0.00
            </q-toolbar-title>
            <q-toolbar-title v-if="totalesCard" class="text-white">
              Total Pedido: {{formatTotal(totalesCard.total)}}
            </q-toolbar-title>
            <q-toolbar-title v-else class="text-white">
              Total Pedido: 0.00
            </q-toolbar-title>
            <q-toolbar-title class="search-header-products bg-white " style="display: none">
              <q-select
                filled
                v-model="select_result"
                option-value="id"
                option-label="description"
                label="¿Que estas buscando hoy?"
                use-input
                hide-selected
                transition-show="scale"
                transition-hide="scale"
                fill-input
                input-debounce="0"
                :options="listSearchSelect"
                @filter="filterFn"
                @input-value="filterSelectAll"
                style="width: 100%; padding-bottom: 32px; background-color: white; height: 100%"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-img :src="scope.opt.url_img" style="min-height: 40px; max-width: 50px" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-toolbar-title>
          </q-toolbar>
          <q-toolbar inset class="col-6  text-white">

            <q-space />
            <q-avatar>
              <q-avatar icon="account_circle" />
            </q-avatar>
            <q-btn-dropdown v-if="customer" stretch flat :label="`Hola: ${customer.company_name}`" size="md">
              <q-list>
                <q-item to="/mi-perfil" clickable v-close-popup tabindex="0">
                  <q-item-section avatar>
                    <q-avatar icon="manage_accounts" text-color="gray"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Mi Perfil</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable to="/change-password" v-close-popup tabindex="0">
                  <q-item-section avatar>
                    <q-avatar icon="miscellaneous_services" text-color="gray"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Cambio de contraseña</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item @click="logoutUser" clickable v-close-popup tabindex="0">
                  <q-item-section avatar>
                    <q-avatar icon="logout" text-color="gray"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Cerrar Sesión</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-separator dark vertical/>
            <shopp-card></shopp-card>
          </q-toolbar>
        </div>
      </div>
      <q-tabs align="left" exact dense class="menu-header">
        <q-route-tab to="/alimentos" label="Alimentos"/>
        <q-route-tab to="/vino-y-destilados" label="Vinos y Destilados"/>
        <q-route-tab to="/bebidas-sin-alcohol" label="Bebidas sin Alcohol"/>
        <q-route-tab to="/cevezas-y-bebidas-alcoholicas" label="Cervezas y Bebidas Alcohólicas"/>
      </q-tabs>
      <div class="div-breadcrumbs  text-primary q-gutter-sm">
        <q-toolbar inset>
          <q-breadcrumbs class="breadroute" align="left" active-color="gray" style="font-size: 14px">
            <q-breadcrumbs-el label="Inicio" to="/inicio"/>
            <q-breadcrumbs-el  :label="this.$route.name"/>
            <q-breadcrumbs-el v-if="product && this.$route.name === 'Producto'" :label="product.product.description"/>
          </q-breadcrumbs>
          <q-space  class="breadroute" />
        </q-toolbar>
      </div>
    </q-header>
<q-header>
  <q-tabs
    inline-label
    outside-arrows
    mobile-arrows
    class="bg-primary text-white shadow-2 q-py-sm"
  >
    <shopp-card></shopp-card>
    <q-tab >Bienvenido: {{user.username}}</q-tab>
    <q-tab v-if="totalesCard">SubTotal: {{formatTotal(totalesCard.subtotal)}}</q-tab>
    <q-tab v-if="totalesCard">Total IVA: {{formatTotal(totalesCard.totalTax)}}</q-tab>
    <q-tab v-if="totalesCard">Total: {{formatTotal(totalesCard.total)}}</q-tab>
  </q-tabs>
  <q-tabs inset
    v-model="tab"
    inline-label
    outside-arrows
    mobile-arrows
    class="bg-primary text-white shadow-2"
  >
    <q-route-tab to="/inicio" name="home" icon="home" label="Inicio" />
    <q-route-tab to="/alimentos" name="mails" icon="lightbulb" label="Alimentos" />
    <q-route-tab to="/vino-y-destilados" name="alarms" icon="alarm" label="Vinos y Destilados" />
    <q-route-tab to="/bebidas-sin-alcohol" name="movies" icon="movie" label="Bebidas Sin Licor" />
    <q-route-tab to="/cevezas-y-bebidas-alcoholicas" name="photos" icon="photo" label="Cervezas y Bebidas Alcoholicas" />
  </q-tabs>
</q-header>
    <q-page-container style="padding-left:0; min-height: 450px;">
      <q-page class="q-mx-md">
        <router-view/>
      </q-page>
    </q-page-container>
    <q-footer elevated  height-hint="150" class="header-container text-white text-center">
      <q-toolbar inset>
        <q-toolbar-title >
          <q-item-label class="flex-center">
            <img class="bg-white" src="../assets/v4.0/logo-friendlyPos.png" height="50"  style="margin-right: 10px;   border-radius: 4%; margin-top: 2px"/>
            <img class="bg-white" src="../assets/v4.0/Logo-FriendlyFac-08.jpg" height="50" style="margin-right: 160px; border-radius: 4%;  margin-top: 2px"/>
            </q-item-label>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar inset>
        <q-toolbar-title>
          <q-item-label caption style="color:white; text-align: center">© power by Sistemas Amigables Latinoamérica S.A. | Todos Los Derechos Reservados.</q-item-label>
        </q-toolbar-title>
        <q-item-label style="min-width: 150px; text-align: left">
          Sigenos en : <q-btn><i class="fab fa-facebook fa-2x"></i></q-btn>
           <q-btn><i class="fab fa-linkedin fa-2x"></i></q-btn>
        </q-item-label>
      </q-toolbar>
    </q-footer>

    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-3"
        align="justify"
        narrow-indicator
      >
        <q-route-tab to="/mi-perfil" name="mails" label="Perfil" />
        <q-route-tab @click="logoutUser" name="movies" label="Cerrar Sesión" />
        <q-route-tab to="/change-password" name="alarms" label="Cambio Contraseña" />
      </q-tabs>
    </q-card>
  </q-layout>
</template>

<script>

const linksList = [
]

import { defineComponent, ref, computed } from 'vue'
import { useStore, mapGetters } from 'vuex'
import shoppCard from '../components/shoppCard'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      drawer: '',
      select_result: '',
      listSearchSelect: '',
      text: ''
    }
  },
  created () {
    this.$store.dispatch('storePush/filterSelectAllProductsActions')
    // this.$store.dispatch('authModules/tryCustomerAction')
  },
  computed: {
    ...mapGetters({
      product: 'storePush/getProductGetter',
      listSelectProducts: 'storePush/listsSelectProductsGetter',
      totalesCard: 'storePush/getTotalCardGetter',
      customer: 'authModules/CustomerGetter',
      user: 'authModules/userName'
    })
  },
  components: { shoppCard },
  mounted () {
    this.listSearchSelect = this.listSelectProducts
    this.$store.dispatch('storePush/setUpdateState')
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.listSearchSelect = this.listSearchSelect.filter(v => v.description.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },
    async filterSelectAll () {
      console.log('hola mundo', this.select_result, 'sasas', this.listSearchSelect)
      if (this.select_result !== '') {
        this.$store.dispatch('storePush/filterAllProductsActions', this.select_result)
      } else {
        this.$store.dispatch('storePush/filterSelectAllProductsActions')
      }
    },
    async logoutUser () {
      await this.$store.dispatch('authModules/logoutAction')
      this.$router.push({ path: '/login' })
    },
    formatTotal (product) {
      return parseFloat(Number(product)).toFixed(2)
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const store = useStore()
    const isLoggedIn = computed(() => store.getters['authModules/isAuthenticated'])
    const user = JSON.parse(localStorage.getItem('user'))
    if (store.getters.isAuthenticated) {
      console.log('Entro a inico')
      store.dispatch('authModules.autoLogout')
      return this.router.push({ path: '/' })
    }
    console.log(isLoggedIn)
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      isLoggedIn,
      user
    }
  }

})
</script>
<style>
</style>
