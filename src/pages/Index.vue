<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-carousel class="carousel-index" style=""
                  animated
                  v-model="slide"
                  navigation
                  infinite
                  :autoplay="autoplay"
                  arrows
                  transition-prev="slide-right"
                  transition-next="slide-left"
                  @mouseenter="autoplay = false"
                  @mouseleave="autoplay = true"
      >
        <q-carousel-slide class="img-caraousel" :name="1" img-src="../assets/v4.0/AF-DUCAL-HTML-1200x1200.jpg"/>
        <q-carousel-slide class="img-caraousel" :name="2" img-src="../assets/v4.0/CRISTAL.jpg"/>
        <q-carousel-slide class="img-caraousel" :name="3" img-src="../assets/v4.0/Esto-es-Personal.png"/>
        <q-carousel-slide class="img-caraousel" :name="4" img-src="../assets/v4.0/LIMONADA1.jpg"/>
      </q-carousel>

      <div class="q-pa-md row page-index-products" style="">
        <div class="col-12 top-product-index"  >
          <h4> Top 15 de la semana</h4>
          <q-list bordered padding  class="justify-center text-primary">
                <q-item
              clickable
              v-ripple
              :active="search === 'topTen'"
              @click="send('topTen')"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <i class="fas fa-cart-arrow-down fa-4x"></i>
              </q-item-section>

            </q-item>
            <q-item
              clickable
              v-ripple
              :active="search === 'CERVEZAS Y BEBIDAS ALCOHOLICAS'"
              @click="send('CERVEZAS Y BEBIDAS ALCOHOLICAS')"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <i class="fas fa-air-freshener fa-4x"></i>
              </q-item-section>

            </q-item>
            <q-item
              clickable
              v-ripple
              :active="search === 'BEBIDAS SIN ALCOHOL'"
              @click="send('BEBIDAS SIN ALCOHOL')"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <i class="fas fa-glass-whiskey fa-4x"></i>
              </q-item-section>

            </q-item>

            <q-item
              clickable
              v-ripple
              :active="search === 'alimentos'"
              @click="send('alimentos')"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <i class="fas fa-coffee fa-4x"></i>
              </q-item-section>

            </q-item>
          </q-list>
        </div>
      </div>
      <div class="q-pa-md">
        <top-lists-products :listsProducts="search"></top-lists-products>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import topListsProducts from '../components/TopListsProducts.vue'
import { api } from 'boot/axios'
export default {
  components: { topListsProducts },
  data () {
    return {
      link: '',
      search: ''
    }
  },
  created () {
    api.get('/products/top-lists-products/' + 'topTen').then((response) => {
      if (response.status === 200) {
        this.search = response.data
      }
    })
  },
  methods: {
    send (val) {
      api.get('/products/top-lists-products/' + val).then((response) => {
        if (response.status === 200) {
          this.search = response.data
        }
      })
      console.log(this.search)
    }
  },
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true)
    }
  }
}
</script>
