<template>
  <q-page class="q-gutter-md flex flex-center justify-center" >
    <div class="row " style="min-width: 500px; margin: 20px">
     <div class="col-4 col-md-4 form-control " >
         <q-input rounded filled v-model="customer.card" readonly label="Cédula" />
       </div>
       <div class="col-4 col-md-4 form-control">
         <q-input rounded filled v-model="customer.company_name" readonly label="Nombre" />
       </div>
       <div class="col-md-4 form-control">
         <q-input rounded filled v-model="customer.fantasy_name" readonly label="Nombre de Fantasia" />
       </div>
       <div class="col-md-4 form-control">
         <q-input rounded filled v-model="customer.email" readonly label="Email" />
       </div>
      <div class="col-md-4 form-control">
        <q-input rounded filled v-model="customer.contact_email" readonly label="Email Contador" />
      </div>
       <div class="col-md-4 form-control">
         <q-input rounded filled v-model="customer.phone" readonly label="Teléfono" />
       </div>
       <div class="col-md-4 form-control">
         <q-input rounded filled v-model="customer.address" readonly label="Dirección" />
       </div>
    </div>
  </q-page>
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
    this.$store.dispatch('authModules/tryCustomerAction')
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
