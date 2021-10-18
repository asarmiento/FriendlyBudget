<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <div class="text-h2 text-center">
        <img src="../assets/v4.0/logo-friendlyPos.png" class="responsive" />
        Fill
      </div>
      <q-form  class="q-gutter-y-md "  >
        <q-input
          v-model="data.username"
          label="Usuario*"
          hint="Usuario "
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor escribe tu usuario']"
        />

        <q-input
          type="password"
          v-model="data.password"
          label="Contraseña *"
          lazy-rules
          :rules="[val => val && val.length > 0 || 'Por favor escribe tu contraseña']"
        />
                <div class="text-center">
          <q-btn @click="send()"  label="Iniciar Sesión" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default ({
  name: 'PageLogin',
  data () {
    return {
      data: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async send () {
      console.log('hola mundo1')
      await this.$store.dispatch('authModules/sendSessionAction', {
        username: this.data.username,
        password: this.data.password
      })
      console.log(this.$store.state.token)
      this.$router.push('/inicio')
    }
  }
})
</script>
