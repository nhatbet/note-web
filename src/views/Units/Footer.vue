<template>
    <footer class="footer">
        <div>Home</div>
        <div>Term & policy</div>
        <div>Status</div>
    </footer>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
footer {
    border-top: 1px solid var(--border-color-primary);
    max-width: 1360px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
        display: inline-block;
        padding: 15px;
        cursor: pointer;
    }
}
</style>
