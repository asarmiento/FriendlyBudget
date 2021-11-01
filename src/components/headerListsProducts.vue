<template>
  <div class="row lists-products " >
    <div class="row col-xs-12 col-md-12 col-lg-12 ">
      <div class="container">
        <div class="container-title">
          <q-item-label class="title-name-menu">{{this.$route.name}}</q-item-label>
        </div>
      </div>
      <div class="container">
        <div class="container-title">
          <q-item-label class="data-name-menu"><strong>{{listsProducts.length}}</strong> PRODUCTOS ENCONTRADOS
          </q-item-label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ListsProducts',
  props: {
    menu: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      listsProducts: [],
      metho: 'Unidad',
      amount: 1
    }
  },
  setup () {
    const items = ref([{}])
    return {
      items,
      onLoad (index, done) {
        setTimeout(() => {
          items.value.push({}, {}, {}, {}, {}, {}, {})
          done()
        }, 2000)
      }
    }
  }
})
</script>
<style >

  .lists-products{
    clear: both;
    margin-top: 5rem;
  }

  .container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 10px;
    padding-right: 10px;
  }

  .title-name-menu {
    color: #333333;
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    text-align: left;
  }
  .data-name-menu {
    color: #333333;
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    text-transform: uppercase;
    text-align: left;
  }
  .container-title{
    display: block;
  }

  @media (min-width: 640px) {
    .container {
      width: 100%;
    }
  }
  @media (min-width: 1024px){
    .container {
      width: 1024px;
    }

  }
  @media (min-width: 1400px){
    .container {
      width: 1400px;
    }

  }
</style>
