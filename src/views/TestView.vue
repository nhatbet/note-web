<template>
    <div class="card flex justify-center">
        <div class="flex flex-col gap-2">
            <label for="username">Username</label>
            <InputText id="username" v-model="value" aria-describedby="username-help" />
            <Message size="small" severity="secondary" variant="simple"
                >Enter your username to reset your password.</Message
            >
        </div>

        
    </div>

    <div class="card flex justify-content-center">
        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-14rem" />
    </div>

    <div class="card flex justify-content-center">
        <Password v-model="value" toggleMask />
    </div>

    <div class="card flex justify-center">
        <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
    </div>
    
</template>

<script setup>
import { ref } from 'vue'

import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Select from 'primevue/select';


const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const value = ref(null)
</script>
