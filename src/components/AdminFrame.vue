<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>BigBikeBash Admin</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container grid-list-md>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'AdminFrame'
}
</script>
