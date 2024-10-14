<template>
    <div class="bottom text-base">
        <CButton text="Help" :type="4"></CButton>
        <CButton text="Status" :type="4"></CButton>
        <CButton text="About" :type="4"></CButton>
        <CButton text="Privacy" :type="4"></CButton>
        <CButton text="Terms" :type="4"></CButton>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.bottom {
    border-top: 1px solid var(--border-color-primary);
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    > * {
        padding: 30px;
    }
}

@media (max-width: 500px) {
    .bottom > * {
        padding: 10px;
    }
}
</style>
