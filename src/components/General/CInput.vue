<template>
  <div :class="[classes]">
    <label>
      <span class="text-base" >{{ label }}</span>
      <span v-show="required" class="error">
        <FontAwesomeIcon :icon="['fas', 'asterisk']" />
      </span>
      <input
        class="w-full p-2 rounded-sm focus:outline-none text-base h-[38px] focus:border-purple-400"
        :placeholder="placeholder"
        :type="type"
        v-model="model"
      />
      <slot name="RIcon"/><slot />
      <small class="error">{{ errors[0] }}</small>
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
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: ''
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
input {
  background-color: var(--bg-color-primary);
  border: 1px solid var(--border-color-primary);
}
.error {
  color: var(--text-color-third);
}
</style>
