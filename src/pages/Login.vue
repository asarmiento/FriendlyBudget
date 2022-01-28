<template>
  <q-page  class="flex flex-center">
    <img id="login-bg" src="../assets/bg-login.jpg" width="1444" height="850">
    <div  class="q-pa-md shadow-5 absolute-left box-login" style=" ">
      <div class="text-h2 text-center logo-bg">
        <img src="../assets/v4.0/logo-friendlyPos.png" class="responsive" />
      </div>
      <q-form  class="q-gutter-y-md" @submit="send">
        <q-input
          v-model="data.username"
          label="Usuario*"
          hint="Usuario "
          lazy-rules
          outlined
          :rules="[ val => val && val.length > 0 || 'Por favor escribe tu usuario']"
        />

        <q-input
          type="password"
          v-model="data.password"
          label="Contraseña *"
          lazy-rules
          outlined
          :rules="[val => val && val.length > 0 || 'Por favor escribe tu contraseña']"
        />
                <div class="text-center">
          <q-btn label="Iniciar Sesión" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>
    <div class="row banner-login">
      <div class=" banner-login--card ">
        Publicidad
      </div>
      <div class=" banner-login--card">
        Publicidad
      </div>
      <div class="   banner-login--card">
        Publicidad
      </div>
      <div class="   banner-login--card">
        Publicidad
      </div>
    </div>
  </q-page>
</template>

<script>
export default ({
  name: 'PageLogin',
  data () {
    return {
      data: {
        username: 'admin',
        password: 'Fw2045zz85'
      }
    }
  },
  methods: {
    async send () {
      try {
        const response = await this.$store.dispatch('authModules/login', {
          username: this.data.username,
          password: this.data.password
        })
        const { user, customer, products } = response

        await this.$store.dispatch('authModules/updateApi', response)

        const { expirationDate, numerationUser } = await this.$store.dispatch('authModules/setLocalStorage', response)

        const data = {
          token: response.access_token,
          expirationDate,
          user,
          numerationUser,
          customer,
          products
        }

        this.$store.dispatch('authModules/setData', data)

        this.$router.push('/inicio')
      } catch (error) {
        alert('error' + error.message)
      }
    }
  }
})
</script>
<style>

</style>
