<template>
    <div>
        <label for="small" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ label }}

            <select
                id="small"
                class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option v-show="visibleOptionFirst" :value="null">Nothing selected.</option>
                <option
                    :selected="option?.value == value"
                    v-for="(option, index) in options"
                    :key="index"
                    :value="option"
                >
                    {{ option?.label }}
                </option>
            </select>
        </label>
    </div>
</template>

<script lang='ts'>
import { ref } from 'vue'

export default {
    name: 'CSelect',
    props: {
        visibleOptionFirst: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: null
        },
        value: {
            type: [String, Number],
            default: null
        },
        options: {
            type: Array,
            default: []
        }
    },
    methods: {},
    setup(props, { emit }) {
        return {}
    }
}
</script>

<style lang="scss" scoped>
</style>
