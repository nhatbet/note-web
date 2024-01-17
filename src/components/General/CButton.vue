<template>
  <button
    :type="type"
    class="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-200"
    :class="[classes]"
    @click="handleClick"
  >
    <CIcon :name="icon" v-if="!!icon"></CIcon>
    <span>{{ text }}</span>
  </button>
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
    type: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
