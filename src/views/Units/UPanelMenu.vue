<template>
  <div class="panel-menu">
    <PanelMenu :model="items" multiple class="w-full md:w-20rem" />
  </div>
</template>

<script lang='ts'>
import PanelMenu from 'primevue/panelmenu'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'UPanelMenu',
  props: {},
  components: {
    PanelMenu
  },

  setup(props) {
    const router = useRouter()
    const items = ref([
      {
        label: 'Files',
        icon: 'pi pi-file',
        items: [
          {
            label: 'Documents',
            icon: 'pi pi-file',
            items: [
              {
                label: 'Invoices',
                icon: 'pi pi-file-pdf',
                items: [
                  {
                    label: 'Pending',
                    icon: 'pi pi-stop'
                  },
                  {
                    label: 'Paid',
                    icon: 'pi pi-check-circle'
                  }
                ]
              },
              {
                label: 'Clients',
                icon: 'pi pi-users'
              }
            ]
          },
          {
            label: 'Images',
            icon: 'pi pi-image',
            items: [
              {
                label: 'Logos',
                icon: 'pi pi-image'
              }
            ]
          }
        ]
      },
      {
        label: 'Cloud',
        icon: 'pi pi-cloud',
        items: [
          {
            label: 'Upload',
            icon: 'pi pi-cloud-upload',
            command: () => {
              router.push('/home/test')
            }
          },
          {
            label: 'Download',
            icon: 'pi pi-cloud-download'
          },
          {
            label: 'Sync',
            icon: 'pi pi-refresh'
          }
        ]
      },
      {
        label: 'Devices',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'Phone',
            icon: 'pi pi-mobile'
          },
          {
            label: 'Desktop',
            icon: 'pi pi-desktop'
          },
          {
            label: 'Tablet',
            icon: 'pi pi-tablet'
          }
        ]
      }
    ])

    return { items }
  }
}
</script>


