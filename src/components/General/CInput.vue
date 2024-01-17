<template>
  <div class="">
    <label>
      <span>{{ label }}</span>
      <input
        class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
        :placeholder="placeholder"
        :type="type"
        @input="updateInput"
      />
    </label>
  </div>
</template>

<script lang='ts'>

export default {
  name: "CInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String, 
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  methods: {
    updateInput(event) {
      console.log('ok');
      this.$emit("update:modelValue", event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
