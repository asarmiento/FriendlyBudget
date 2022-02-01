<template>
  <q-page class="q-gutter-md flex flex-center justify-center" >
    <div class="row " style="min-width: 100%; max-width: 300px; margin: 20px; justify-content: center; ">
<q-input outlined standout="bg-gray"   type="password" hint="Password" filled v-model="password"  label="Nueva Contraseña" />
<q-input outlined standout="bg-gray"   type="password" hint="Password" filled v-model="confirm_password"  label="Confirmar Contraseña" />
       <div class="col-12 text-center q-py-md">
        <q-btn class="bg-grey" @click="send">Actualizar</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
export default defineComponent({
  data () {
    return {
      password: '',
      confirm_password: ''
    }
  },
  methods: {
    send () {
      if (this.password === this.confirm_password) {
        api.post('/user/change-password', { password: this.password })
        this.$router.push('/inicio')
      } else {
        this.$q.notify('Las dos contraseñas deben ser iguales')
      }
    }
  },
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true)
    }
  }
})
</script>
