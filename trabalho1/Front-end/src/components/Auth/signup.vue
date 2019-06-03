<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Email</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">User details</v-stepper-step>

        <v-divider></v-divider>
      </v-stepper-header>

      <v-stepper-items>
        <v-layout align-center justify-center>
          <v-form>

            <v-stepper-content step="1">
              <v-card class="mb-5" color="grey lighten-1" width="50rem">
                <v-card-text>
                  <v-text-field prepend-icon="person" name="email" label="Email" type="text"></v-text-field>
                </v-card-text>
              </v-card>

              <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-5" color="grey lighten-1" width="50rem">
                <v-card-text>
                  <v-text-field prepend-icon="person_outline" name="name" label="First Name" type="text"></v-text-field>
                  <v-text-field prepend-icon="calendar_today" name="Birthday" label="Insert your birthday" type="date"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                  <v-text-field prepend-icon="lock" name="repeatPassword" label="Repeat password" type="password"></v-text-field>
                </v-card-text>
              </v-card>

              <v-btn color="secondary" @click="e1 = 1">Back</v-btn>
              <v-btn color="primary">Signup</v-btn>
            </v-stepper-content>

          </v-form>
        </v-layout>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      e1: 0
    };
  },
  methods: {}
};
</script>