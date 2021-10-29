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
  .table-filter-products{
    background-color: #EF4436;
  }
  .q-card__section--vert{
    padding: 5px;
  }
  .lists-products{
    clear: both;
    margin-top: 5rem;
  }
  *{
    box-sizing: border-box;
  }

  .card-products{
    width: 24%;
    min-height: 38rem;
  }
  .lists-products-page{
    padding-left: 0;
    list-style: none;
    margin: 22px 0 0 0;
    display: flex;
    flex-wrap: wrap;
  }
  .q-carousel{
    max-height: 300px;
  }
  img.responsive {
    height: 25rem;
  }

  .container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 10px;
    padding-right: 10px;
  }
  .img-lists-product{
    display: block;
    margin-bottom: 10px;
    text-align: center;
    height: 180px;
    overflow: hidden;
    position: relative;
  }
  .img-lists-product img{
    width: 100%;
    height: auto;
    max-width: 140px;
    vertical-align: middle;
    border: 0;
  }
  .details-product {
    height: 39px;
    text-align: center;
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    display: inline-block;
    -webkit-flex: 0 0 auto;
    -moz-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .container-stamps {
    width: 100%;
    height: 40px;
    position: relative;
    z-index: 9;
    top: 0px;
    right: 19px;
  }
  .container-product-item {
    width: auto;
    padding: 15px 0 0 0;
    text-decoration: none;
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
  .product-item {
    float: right;
    width: 60%;
    position: relative;
    min-height: 1px;
    padding: 20px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .product-item:first-child {
    margin-left: -1px;
  }
  @media (min-width: 640px){
    .container {
      width: 100%;
    }
    .product-item {
      float: left;
      width: 25%;
    }
    .product-item:nth-child(4n+1) {
      clear: both;
    }
  }
  @media (min-width: 1024px){
    .container {
      width: 1024px;
    }
    .product-item {
      float: left;
      width: 25%;
    }
  }
  @media (min-width: 1400px){
    .container {
      width: 1400px;
    }
    .product-item {
      float: left;
      width: 25%;
    }
  }
</style>
