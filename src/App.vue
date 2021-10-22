<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  mounted () {
    this.$store.dispatch('authModules/trySessionAction')
  }
})
</script>
<style src="./css/style.scss" lang="scss"></style>
