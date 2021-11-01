<template>
  <div class="active-list">
    <q-select
      filled
      v-model="valuemember"
      use-input
      use-chips
      input-debounce="0"
      @new-value="createValue"
      :options="dataSource"
      @filter="filterFn"
      style="width: 250px"
      @input="change"
      @keydown.down="down"
      @keyup.up="up"
      @click="down"
      @keypress.enter="enter" class="form-control"
    ><q-icon name="search" size="xl" /></q-select>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
export default defineComponent({
  props: {
    dataSource: {
      type: Array,
      required: true,
      twoWay: true
    },
    optionvalue: {
      type: String,
      required: true
    },
    optionlabel: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      valuemember: null,
      viewList: false,
      nowList: 0,
      filterOptions: ''
    }
  },
  created () {
    this.filterOptions = ref(this.stringOptions)
  },
  computed: {
    dataset: {
      get () {
        return this.dataSource
      },
      set (value) {
        this.data2Source = value
        // this.$emit("dataset", value)
      }
    }
  },
  methods: {
    change () {
      if (!this.viewList) {
        this.viewList = true
      } else {
        this.viewList = false
      }
    },
    selecctionItems (index) {
      this.$emit('seleccionado', this.results[index].value)
      const select = this.results[index]
      this.selection = select.label
      this.viewList = false
      return select
    },
    down () {
      this.viewList = true
      if (this.nowList < this.results.length - 1) {
        this.nowList++
      }
    },
    up () {
      if (this.nowList > 0) {
        this.nowList--
      }
    },
    enter () {
      this.$emit('seleccionado', this.results[this.nowList].value)
      const select = this.results[this.nowList]
      this.selection = select.label
      this.viewList = false
      return select
    },
    searchContent () {
      this.$emit('seleccionado', this.results[this.nowList].value)
      const select = this.results[this.nowList]
      console.log(this.selection)
      this.selection = select.label
      this.viewList = false
    },
    isActive (index) {
      return index === this.nowList
    },
    filterFn (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.data2Source.value = stringOptions
          } else {
            const needle = val.toLowerCase()
            this.data2Source.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
          }
        })
      }, 1500)
    }
  }
})
</script>

<style scoped>
.active {
  text-decoration: underline;
  background-color: #66afe9;
  color: #ffffff;
}
input{
  width: 100%;
}
.active-list{
  z-index: 1000;
  position: relative;
  width: 100%;
}

ul {
  list-style: none;
  border-color: #66afe9;
  position: absolute;
  background-color: white;
  left: 0;
    width: 100%;
    top: 35px;
    min-height: 100%;
    padding: 6px;
  outline: 0;
  z-index: 11000;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
  0 0 8px rgba(102, 175, 233, .60);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.75),
  0 0 8px rgba(102, 175, 233, .60);
  max-height: 400px;
  overflow-y: auto;
}

li {
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  padding: 5px 6px;
  text-align: left;
}

li:hover {
  background-color: #66afe9;
  color: #ffffff;
  cursor: pointer;
  padding: 5px 6px;
}
span{
  padding: 8px;
}
.inputWithIcon {
  position: relative;
}

.inputWithIcon i {
  position: absolute;
  right: 10px;
  top: 5px;
  padding: 9px 8px;
  color: #555;
  font-weight: bold;
  transition: 0.3s;
}
</style>
