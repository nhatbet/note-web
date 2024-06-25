<template>
  <div class="text-base">
    <label>
      <span >{{ label }}</span>
      <span v-show="required" class="text-rose-600 text-xs">
        <FontAwesomeIcon :icon="['fas', 'asterisk']" />
      </span>
      <input
        class="w-full text-sm px-2 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-purple-400"
        :placeholder="placeholder"
        :type="type"
        v-model="model"
      />
      <slot name="RIcon"/><slot />
      <small class="text-sm text-rose-600">{{ errors[0] }}</small>
    </label>
  </div>
</template>

<script lang='ts'>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'

export default {
  name: 'CInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
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
    errors: {
      type: [Array],
      default: []
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  setup(props, { emit }) {
    library.add({ faAsterisk })
    const model = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value)
      }
    })

    return { model }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
