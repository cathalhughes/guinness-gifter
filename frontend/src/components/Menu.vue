<template>
  <v-data-table
          :headers="headers"
          :items="menu"
          :items-per-page="5"
          class="elevation-1"
  />
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: "Menu",
        methods: {
            ...mapActions('menu', ['getMenu'])
        },
        data: () => ({
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Vegetarian', value: 'isVegetarian' },
                { text: 'Cuisine Type', value: 'cuisine' },
                { text: 'Price', value: 'price' },
                { text: 'Label', value: 'label' },
            ]
        }),
        computed: {
            ...mapState('menu', ['menu']),
        },
        created() {
            this.getMenu()
        }
    }
</script>

<style scoped>

</style>

