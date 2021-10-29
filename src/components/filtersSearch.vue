<template>
  <q-drawer
    side="right"
    v-model="drawer"
    show-if-above
    :width="350"
    elevated
  >
    <q-list padding class="menu-list q-mr-md border-radius border-primary">
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
            <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
              elit.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow"/>
          </q-item-section>
        </q-item>

        <q-separator spaced inset/>
        <q-item>
          <q-item-section>
            <q-item-label>Comprar por Categoría</q-item-label>
            <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
              elit.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow"/>
          </q-item-section>
        </q-item>

        <q-separator spaced inset/>
        <q-item>
          <q-item-section>
            <q-item-label>Compra por Empaque</q-item-label>
            <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
              elit.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow"/>
          </q-item-section>
        </q-item>

        <q-separator spaced inset/>
      </q-list>
    </div>
  </q-drawer>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'shoppCard',
  data () {
    return {
      listsProducts: []
    }
  },
  computed: {
  // mix the getters into computed with object spread operator
    ...mapGetters({
      countProducts: 'storePush/countProductGetter'
    })
  }
})
</script>

<style scoped>

</style>
