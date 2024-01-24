<template>
  <button
    :type="type"
    class="w-full flex items-center justify-center border border-gray-300 text-sm text-gray-500 p-3 rounded-lg tracking-wide cursor-pointer"
    :class="[classes]"
    @click="handleClick"
  >
    <CIcon :name="icon" v-if="!!icon"></CIcon>
    {{ text }}
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
    handleClick(event: Event) {
      this.$emit('clickCButton')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
