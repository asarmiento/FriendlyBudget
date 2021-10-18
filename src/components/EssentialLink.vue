<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list >
      <q-item clickable v-ripple :to="link">
        <q-item-section avatar>
          <q-icon color="primary" :name="icon" />
        </q-item-section>

        <q-item-section >{{ title }}</q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>
