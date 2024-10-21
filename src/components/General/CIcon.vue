<template>
  <span v-html="icon" :class="[{disable: disable, load: load}, classes]"></span>
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
    },
    disable: {
      type: Boolean,
      default: false
    },
    load: {
      type: Boolean,
      default: false
    },
    classes: {
      type: [String, Object],
      default: ''
    },
  },
  methods: {},
  setup(props) {
    const icon = ref(CIcons[props.name])

    return { icon }
  }
}
</script>

<style lang="scss" scoped>

.color-red {
  color: red;
}
.disable {
  opacity: 0.3;
  cursor: not-allowed;
}
.load {
  color: yellow;
  cursor: wait;
}
span {
  color: var(--text-color-fourth);
}
</style>
