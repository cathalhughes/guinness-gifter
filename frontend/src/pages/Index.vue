<script>
    import navItems from '../constants/sideNavItems';
import { initSession } from '../auth/session-manager';

    export default {
        name: 'Index',
        data: () => ({
            navItems: navItems,
        }),
        components: {
            AppBar: () => import('@/components/navigation/AppBar'),
            NavigationDrawer: () => import('@/components/navigation/NavigationDrawer'),
            NavigationView: () => import('@/pages/View')
        },
        mounted() {
          initSession()
        },
    }
</script>

<template>
  <v-app>
    <app-bar />
    <navigation-drawer :nav-items="navItems"/>
    <navigation-view />
  </v-app>
</template>
