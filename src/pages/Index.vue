<template>
  <q-page class="flex flex-center">
  <div class="q-pa-md">
    <q-carousel  style="min-width: 40rem; min-height:42rem"
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
      <q-carousel-slide :name="1"  img-src="../assets/v4.0/AF-DUCAL-HTML-1200x1200.jpg" />
      <q-carousel-slide :name="2" img-src="../assets/v4.0/CRISTAL.jpg" />
      <q-carousel-slide :name="3" img-src="../assets/v4.0/Esto-es-Personal.png" />
      <q-carousel-slide :name="4" img-src="../assets/v4.0/LIMONADA1.jpg" />
    </q-carousel>
  </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true)
    }
  }
}
</script>
