<template>
  <div class="q-pa-md">
    <q-page class="q-gutter-md " style="width: 100%">
      <div class="row ">
        <div class=" col-md-4 col-sm-12 ">
          <q-input rounded filled v-model="customer.card" dense readonly label="Cédula"/>
        </div>
        <div class=" col-md-4 col-sm-12 form-control">
          <q-input rounded filled v-model="customer.company_name" dense readonly label="Nombre"/>
        </div>
        <div class=" col-md-4 col-sm-12 form-control">
          <q-input rounded filled v-model="customer.fantasy_name" dense readonly label="Nombre de Fantasia"/>
        </div>
        <div class=" col-md-4 col-sm-12 ">
          <q-input rounded filled v-model="customer.email" dense readonly label="Email"/>
        </div>
        <div class=" col-md-4 col-sm-12  form-control">
          <q-input rounded filled v-model="customer.contact_email" dense readonly label="Email Contador"/>
        </div>
        <div class=" col-md-4 col-sm-12  form-control">
          <q-input rounded filled v-model="customer.phone" dense readonly label="Teléfono"/>
        </div>
        <div class=" col-md-4 col-sm-12  form-control">
          <q-input rounded filled v-model="customer.address" dense readonly label="Dirección"/>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  data () {
    return {
      text: ''
    }
  },
  mounted () {
  //  this.$store.dispatch('authModules/tryCustomerAction')
  },
  computed: {
    ...mapGetters({
      customer: 'authModules/CustomerGetter'
    })
  },
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true)
    }
  }
})
</script>
