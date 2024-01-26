<template>
  <a
    class="w-full flex items-center justify-center border border-gray-300 text-sm text-gray-500 p-3 rounded-lg tracking-wide cursor-pointer"
    :class="[classes]"
    @click="handleClick"
    :href="href"
  >
    <CIcon :name="icon" v-if="!!icon"></CIcon>
    {{ text }}
  </a>
</template>

<script lang='ts'>
export default {
  name: 'CButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: '#'
    },
  },
  methods: {
    handleClick(event: Event) {
      this.$emit('clickCButton')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
