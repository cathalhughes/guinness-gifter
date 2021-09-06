<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'AppBar',
    methods: {
        ...mapMutations('navigation', ['setDrawer'])
    },
    computed: {
        ...mapGetters('navigation', ['getDrawer'])
    }
}
</script>

<template>
    <v-app-bar
            id="app-bar"
            absolute
            color="transparent"
            app
            max-height="75"
    >
        <v-app-bar-nav-icon id="hamburger_button"
                            @click="setDrawer(!getDrawer)"/>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-app-bar>
</template>
<style lang="scss">

</style>
