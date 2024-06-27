<template>
  <a
    class="w-full flex items-center justify-center border border-purple-700 text-sm p-2 rounded-md cursor-pointer inline-block hover:bg-purple-700 hover:text-white transition-all"
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
