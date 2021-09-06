<template>
    <v-card outlined>
        <div class="d-flex flex-no-wrap justify-space-between">
            <div class="flex-grow-1">
                <v-card-title class="headline">
                    {{stat}}
                </v-card-title>
            </div>

            <div>
                <v-card-title class="headline">
                    {{value}}
                </v-card-title>
            </div>
        </div>
    </v-card>
</template>

<script>

export default {
    props: {
        stat: {
            type: String,
            required: true
        },
        value: {
            required: true
        }
    },
}
</script>