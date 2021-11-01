<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="header-container " height-hint="98">
      <div class="q-pa-md header-info-search q-gutter-y-sm">
        <div class="row no-wrap shadow-1  ">
          <q-toolbar class="col-6 " style="border-radius: 4%;">
            <q-avatar class="q-mr-md" size="4rem" >
              <img src="../assets/v4.0/FP-Iconoapp-01.png">
            </q-avatar>
            <q-toolbar-title class="search-header-products " >
              <vue-selects :dataSource="[{label:'hola muendo',value:'a'}]" optionvalue="" optionlabel=""></vue-selects>
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
                <q-item clickable v-close-popup tabindex="0">
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
            <q-btn stretch  icon="star" size="lg"/>
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
          <q-breadcrumbs align="left" active-color="gray" style="font-size: 14px">
            <q-breadcrumbs-el label="Inicio" to="/inicio"/>
            <q-breadcrumbs-el  :label="this.$route.name"/>
            <q-breadcrumbs-el v-if="product && this.$route.name === 'Producto'" :label="product.product.description"/>
          </q-breadcrumbs>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container style="padding-left:0">
      <q-page class="q-pa-md">
        <router-view/>
      </q-page>
    </q-page-container>
    <q-footer elevated class="bg-primary text-white text-center">
      <q-toolbar>
        <q-toolbar-title>
          <q-item-label>Sistemas Amigables Latinoamérica S.A.</q-item-label>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>

const linksList = [
]

import { defineComponent, ref, computed } from 'vue'
import { useStore, mapGetters } from 'vuex'
import shoppCard from '../components/shoppCard'
import vueSelects from '../components/vueSelects'
export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      drawer: '',
      text: ''
    }
  },
  created () {
    this.$store.dispatch('authModules/tryCustomerAction')
    // this.$store.dispatch('storePush/listprodutsAction')
  },
  computed: {
    ...mapGetters({
      product: 'storePush/getProductGetter',
      listProducts: 'authModules/getListsProductGetter',
      customer: 'authModules/CustomerGetter'
    })
  },
  components: { shoppCard, vueSelects },
  methods: {
    async logoutUser () {
      await this.$store.dispatch('authModules/logoutAction')
      this.$router.push({ path: '/' })
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const store = useStore()
    const isLoggedIn = computed(() => store.getters.isAuthenticated)
    const user = JSON.parse(localStorage.getItem('user'))
    if (store.getters.isAuthenticated) {
      console.log('Entro a inico')
      store.dispatch('authModules.autoLogout')
      return this.router.push({ path: '/' })
    }

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
