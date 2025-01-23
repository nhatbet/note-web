<template>
    <teleport to="body">
        <div v-if="visible" class="confirm-dialog-overlay">
            <div class="confirm-dialog">
                <div class="confirm-head">
                    <CIcon class="icon-confirm" name="error-warning"></CIcon>
                    <CIcon name="close" class="close" @click="onCancel"></CIcon>
                </div>
                <p>{{ message }}</p>
                <div class="confirm-dialog-actions">
                    <button @click="onCancel" class="cancel">Cancel</button>
                    <button @click="onConfirm" class="confirm">Accept</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CIcon from './CIcon.vue';

// Reactive state
const visible = ref(false)
const message = ref('')
let resolveCallback: ((value: boolean) => void) | null = null

// Method to show the dialog
const showDialog = (msg: string): Promise<boolean> => {
    message.value = msg
    visible.value = true

    return new Promise((resolve) => {
        resolveCallback = resolve
    })
}

// Confirm button action
const onConfirm = (): void => {
    visible.value = false
    if (resolveCallback) resolveCallback(true)
}

// Cancel button action
const onCancel = (): void => {
    visible.value = false
    if (resolveCallback) resolveCallback(false)
}

// Provide the `showDialog` method globally
// export default { showDialog }
defineExpose({
    showDialog
})
</script>

<style lang="scss" scoped>
.confirm-dialog-overlay {
    font-size: 1.5rem;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.confirm-dialog {
    max-width: 400px;
    background-color: var(--bg-color-primary);
    padding: 15px;
    border-radius: 8px;
    text-align: center;
}
.confirm-dialog-actions {
    display: flex;
    justify-content: end;
    margin-top: 10px;

    .confirm {
        background-color: #5046E4;
        color: white;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 20px;
    }

    .cancel {
        color: var(--text-color-primary);
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 20px;
        border: 1px solid var(--text-color-primary);
    }
}
.confirm-dialog-actions button {
    margin: 5px;
}

.confirm-head {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;

    .icon-confirm {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        color: #473EC9;
        background-color: #EDF2FE;
    }

    .close {
        cursor: pointer;
    }
}
</style>
