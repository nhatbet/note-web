import { createApp } from 'vue';
import ConfirmDialog from './components/General/ConfirmDialog.vue';

let confirmApp: ReturnType<typeof createApp> | null = null;
let showDialog: ((msg: string) => Promise<boolean>) | null = null;

export function useConfirm(): (msg: string) => Promise<boolean> {
  if (!confirmApp) {
    const container = document.createElement('div');
    document.body.appendChild(container);

    confirmApp = createApp(ConfirmDialog);
    const instance = confirmApp.mount(container) as any;

    showDialog = instance.showDialog;
  }

  return showDialog!;
}
