<template>
  <q-page id="login-page" >
    <div  class="q-pa-md shadow-5  box-login">
      <div class="text-h2 text-center logo-bg">
        <img src="../assets/v4.0/LogosFriendlyStoreWeb-01.png" class="responsive" />
      </div>
      <q-form  class="q-gutter-y-md " @submit="send"  >
        <q-input
          v-model="data.username"
          label="Usuario*"
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
    <q-img id="login-bg" src="../assets/bg-login.jpg" width="1444" height="850" />
    <div class=" row items-start banner-login">
      <div class=" banner-login--card ">
        <q-img src="../assets/Publi1.jpg" class="responsive banner-login--card--img" />
      </div>
      <div class=" banner-login--card">

        <q-img src="../assets/Publi2.jpg" class="responsive banner-login--card--img" />
      </div>
      <div class="   banner-login--card">

        <q-img src="../assets/Public3.jpg" class="responsive banner-login--card--img" />
      </div>
      <div class="   banner-login--card">
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
        username: '',
        password: ''
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
        console.log(this.$store.state.authModules.success)
        if (!this.$store.state.authModules.success) {
          this.$q.notify('Usuario o contraseña invalidos')
          return false
        }
        const { user, customer, products } = response

        await this.$store.dispatch('authModules/updateApi', response)

        const { expirationDate, numerationUser } = await this.$store.dispatch('authModules/setLocalStorage', response)

        const result = {
          token: response.access_token,
          expirationDate,
          user,
          numerationUser,
          customer,
          products
        }

        this.$store.dispatch('authModules/setData', result)

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
