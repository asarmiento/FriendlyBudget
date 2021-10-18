<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <div class="q-pa-md">
        <div class="q-gutter-y-md column">
          <q-toolbar >
          <q-avatar class="q-mr-sm">
            <img src="../assets/v4.0/FP-Iconoapp-01.png">
          </q-avatar>
            <q-input bg-color="white"  dense outlined rounded  v-model="text" size="50" input-class="text-right" class="q-ml-md">
              <template v-slot:append>
                <q-icon v-if="text === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
              </template>
            </q-input>
            <q-space />
            <q-avatar>
              <img src="../assets/v4.0/FP-Iconoapp-01.png">
            </q-avatar>
            <q-btn-dropdown stretch flat :label="`Bienvenido: ${user.username}`">
              <q-list>
                <q-item-label header>Folders</q-item-label>
                <q-item v-for="n in 3" :key="`x.${n}`" clickable v-close-popup tabindex="0">
                  <q-item-section avatar>
                    <q-avatar icon="folder" color="secondary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Photos</q-item-label>
                    <q-item-label caption>February 22, 2016</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" />
                  </q-item-section>
                </q-item>
                <q-separator inset spaced />
                <q-item-label header>Files</q-item-label>
                <q-item v-for="n in 3" :key="`y.${n}`" clickable v-close-popup tabindex="0">
                  <q-item-section avatar>
                    <q-avatar icon="assignment" color="primary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Vacation</q-item-label>
                    <q-item-label caption>February 22, 2016</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-separator dark vertical />
            <q-btn stretch flat icon="star"  />
            <q-separator dark vertical />
            <shopp-card></shopp-card>
          </q-toolbar>
      </div>
      </div>

      <q-tabs align="center" exact dense bg-color="black" >
        <q-route-tab to="/alimentos" label="Alimentos" />
        <q-route-tab to="/vino-y-destilados" label="Vinos y Destilados" />
        <q-route-tab to="/bebidas-sin-alcohol" label="Bebidas sin Alcohol" />
        <q-route-tab to="/cevezas-y-bebidas-alcoholicas" label="Cervezas y Bebidas Alcohólicas" />
      </q-tabs>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="350"
      :breakpoint="500"
    >
        <q-list padding class="menu-list q-ml-md border-radius border-primary" >
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <img src="../assets/v4.0/FP-Iconoapp-01.png" width="50">
            </q-item-section>

            <q-item-section>
              FILTRÁ ACÁ
              TÚ BÚSQUEDA
            </q-item-section>
          </q-item>
        </q-list>

      <div class="q-pa-md" style="max-width: 350px">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Comprar por Marcas</q-item-label>
              <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>

          <q-separator spaced inset />
          <q-item>
            <q-item-section>
              <q-item-label>Comprar por Categoría</q-item-label>
              <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>

          <q-separator spaced inset />
          <q-item>
            <q-item-section>
              <q-item-label>Compra por Empaque</q-item-label>
              <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>

          <q-separator spaced inset />
        </q-list>
      </div>
    </q-drawer>
    <q-page-container>
      <q-item>
        <h4 class="text-primary">{{$route.name}}</h4>
      </q-item>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/v4.0/FP-Iconoapp-01.png">
          </q-avatar>
          <div>Friendly Pos Fill</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>

const linksList = [
]

import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import shoppCard from '../components/shoppCard'
export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      drawer: '',
      text: ''
    }
  },
  components: { shoppCard },
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
