<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card class="elevation-1 pa-3">
            <div class="layout column align-center">
              <v-card-title class="flex my-4 primary--text"><v-btn @click="login()" color="primary">Login</v-btn></v-card-title>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  // .. imports removed for brevity

  export default {
    methods: {
      // Log the user in
      login() {
        this.$auth.login();
      },
    }
  };
</script>

<style scoped>

</style>
