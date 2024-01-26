<template>
  <span v-html="icon"></span>
</template>

<script lang='ts'>
import CIcons from '@/helpers/icons'
import { ref } from 'vue'

export default {
  name: 'CIcon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {},
  setup(props) {
    const icon = ref(CIcons[props.name])

    return { icon }
  }
}
</script>

<style lang="scss" scoped>
</style>
