<template>
    <div class="text-base" :class="classes">
        <div @focus="focusSelect" @focusout="blurSelect" tabindex="0" class="select-search">
            {{ label }}
            <div
                class="cursor-pointer w-full min-h-[38px] p-2 border border-gray-200 rounded-sm relative focus:outline-none focus:border-purple-400 content-center"
                :class="{ 'border-purple-400': visibleOption }"
            >
                <div
                    class="text-base text-slate-400"
                    v-show="!selected || (!selected.length && multipleSelect)"
                >
                    {{ placeholder }}
                </div>
                <div>
                    <div class="text-sm" v-if="!multipleSelect">
                        {{ selected?.label }}
                    </div>
                    <div v-else>
                        <div
                            class="h-[30px] border border-gray-200 rounded-lg px-2 inline-block content-center mr-2"
                            v-for="(item, index) in selected"
                            :key="index"
                        >
                            {{ item.label }}
                            <FontAwesomeIcon :icon="['fas', 'xmark']" @click="removeItem(item)" />
                        </div>
                    </div>
                </div>
                <span class="absolute right-[10px] top-[7px]">
                    <FontAwesomeIcon
                        v-show="visibleOption"
                        @click="blurSelect"
                        :icon="['fas', 'caret-down']"
                    />
                    <FontAwesomeIcon
                        v-show="!visibleOption"
                        @click="focusSelect"
                        :icon="['fas', 'caret-up']"
                    />
                </span>
                <div
                    class="option-items absolute top-[115%] left-[0] z-20 bg-white min-w-full rounded-sm border border-gray-200"
                    v-if="visibleOption"
                >
                    <!-- <input
                        class="w-full text-sm p-2 border-b border-gray-200 focus:outline-none"
                        v-model="searchValue"
                        placeholder="Search"
                    /> -->
                    <div class="max-h-[200px] overflow-auto">
                        <div
                            class="hover:bg-gray-100 p-2"
                            :class="{ 'bg-gray-200': handleSelected(option) }"
                            v-for="(option, index) in optionsFilter"
                            :key="index"
                            @click="handleClickOption(option)"
                        >
                            <p class="text-md">{{ option.label }}</p>
                            <p class="text-sm">{{ option.description }}</p>
                        </div>
                        <p class="text-sm p-2" v-show="optionsFilter.length == 0">
                            No matches found
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretUp, faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import type { Option } from '@/types/TSelect'

export default {
    name: 'CInput',
    props: {
        modelValue: {
            type: [String, Number, Array],
            default: ''
        },
        classes: {
            type: [String, Array],
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        options: {
            type: null,
            default: [] as Option[]
        },
        placeholder: {
            type: String,
            default: ''
        },
        multipleSelect: {
            type: Boolean,
            default: false
        }
    },
    components: {},
    computed: {
        optionsFilter: function () {
            if (this.searchValue.length == 0) {
                return this.options
            }
            const filteredOptions = this.options.filter((obj: Option) => {
                return obj.label.toLowerCase().indexOf(this.searchValue.toLowerCase()) >= 0
            })

            return filteredOptions
        }
    },
    setup(props, { emit }) {
        library.add({ faCaretUp, faCaretDown, faXmark })
        const visibleOption = ref(false)
        const selected = ref()
        if (props.multipleSelect) {
            selected.value = []
        }

        const searchValue = ref('')

        return { selected, visibleOption, searchValue }
    },

    methods: {
        handleClickOutside() {
            alert('Bạn đã nhấp ra ngoài!');
        },
        focusSelect() {
            this.visibleOption = true
        },
        blurSelect() {
            this.visibleOption = false
        },
        handleClickOption(item: Option) {
            if (this.multipleSelect) {
                if (this.selected.indexOf(item) === -1) {
                    this.selected.push(item)
                    this.updateModelValue()
                }
            } else {
                this.selected = item
                this.updateModelValue()
            }
            this.visibleOption = true
        },
        handleSelected(item: Option) {
            if (this.multipleSelect) {
                return this.selected.indexOf(item) !== -1
            }

            return this.selected == item
        },
        // For only multiple.
        removeItem(item: Option) {
            this.selected = this.selected.filter((obj: Option) => {
                return obj != item
            })

            this.updateModelValue()
        },
        updateModelValue() {
            if (this.multipleSelect) {
                this.$emit(
                    'update:modelValue',
                    this.selected.map((item: Option) => {
                        return item.value
                    })
                )
            } else {
                this.$emit('update:modelValue', this.selected.value)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.select-search:has(input:focus) option-items {
    display: block;
}

/* width */
::-webkit-scrollbar {
    width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
    border-radius: 8px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(184, 184, 184);
    border-radius: 8px;
}
</style>
