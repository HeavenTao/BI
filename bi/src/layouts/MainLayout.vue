<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="no-padding">
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="mdi-image-edit-outline" size="xs"></q-icon>
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer side="left" :width="400" show-if-above v-model="leftDrawerOpen">
      <page-document></page-document>
    </q-drawer>

    <q-drawer side="right" :width="400" show-if-above v-model="rightDrawerOpen">
      <property-grid></property-grid>
    </q-drawer>

    <q-page-container>
    </q-page-container>
  </q-layout>
</template>

<script>
import PageDocument from "../components/PageDocument.vue"
import PropertyGrid from "../components/PropertyGrid.vue"
export default {
  name: 'MainLayout',
  components: { PageDocument, PropertyGrid },
  data() {
    return {
      leftDrawerOpen: true,
      rightDrawerOpen: true,
    }
  },
  created() {

  }
}
</script>
