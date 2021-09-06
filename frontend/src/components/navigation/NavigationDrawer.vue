<script>
  import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'NavigationDrawer',
  props: {
    navItems: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapMutations('navigation', ['setDrawer'])
  },
  computed: {
    ...mapGetters('navigation', ['getDrawer']),

    drawer: {
      get () {
        return this.getDrawer
      },
      set (val) {
        this.setDrawer(val)
      },
    },

  }
}
</script>

<template>
  <v-navigation-drawer
          app
          color="primary"
          v-model="drawer"
  >
    <router-link data-qa="logoLink" to="/">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Test Drawer
          </v-list-item-title>
          <v-list-item-subtitle>
            business/{businessId}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </router-link>

    <v-divider class="mb-1" />

    <v-list>
      <v-list-item
              v-for="(item, i) in navItems"
              :key="item.title"
              link
              :to="item.href"
      >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title :id="`drawerItem-${i}`">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <router-link data-qa="logoLink" to="/login">
          <v-btn block @click="$auth.logout()">Logout</v-btn>
        </router-link>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style lang="scss">

</style>
