<template>
  <div class="">
    <label>
      <span>{{ label }}</span>
      <span v-show="required" class="text-rose-600 text-xs">
        <FontAwesomeIcon :icon="['fas', 'asterisk']" />
      </span>
      <input
        class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
        :placeholder="placeholder"
        :type="type"
        @input="updateInput"
        :value="modelValue"
      />
      <slot name="RIcon"/><slot />
      <div class="text-sm text-rose-600">{{ errors[0] }}</div>
    </label>
  </div>
</template>

<script lang='ts'>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'CInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    errors: {
      type: [Array],
      default: []
    },
    required: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    library.add({ faAsterisk })
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
