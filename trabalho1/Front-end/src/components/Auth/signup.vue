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
          <v-form v-on:submit.prevent="signup" id="signupForm">
            <v-stepper-content step="1">
              <v-card class="mb-5" color="grey lighten-1" width="50rem">
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    prepend-icon="person"
                    name="email"
                    label="Email"
                    type="text"
                  ></v-text-field>
                </v-card-text>
              </v-card>

              <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-5" color="grey lighten-1" width="50rem">
                <v-card-text>
                  <v-text-field
                    v-model="name"
                    prepend-icon="person_outline"
                    name="Name"
                    label="Name"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="contacto"
                    prepend-icon="person_outline"
                    name="contacto"
                    label="Contact"
                    type="number"
                  ></v-text-field>
                  <v-text-field
                    v-model="data_nasc"
                    prepend-icon="calendar_today"
                    name="Birthday"
                    label="Insert your birthday"
                    type="date"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    v-model="repeatedPassword"
                    prepend-icon="lock"
                    name="repeatPassword"
                    label="Repeat password"
                    type="password"
                  ></v-text-field>
                </v-card-text>
              </v-card>

              <v-btn color="secondary" @click="e1 = 1">Back</v-btn>
              <v-btn type="submit" color="primary" form="signupForm">Signup</v-btn>
            </v-stepper-content>
          </v-form>
        </v-layout>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
const API_URL = "http://localhost:3000/register/signup";
import axios from "axios"
import router from '../../router';
export default {
  name: "Signup",
  data() {
    return {
      e1: 0,
      email: null,
      name: null,
      contacto: null,
      password: null,
      repeatedPassword: null,
      data_nasc: null
    };
  },
  methods: {
    failSignup(){
      console.log("Failed Signup");
    },
    validateSignup(res){
      if(res.data.isRegisted == true){
        router.go("/users/login");
      }else{
        this.failSignup();
        router.go("/users/signup");
      }
    },
    signup() {
      var data = {
        email: this.email,
        name: this.name,
        contacto: this.contacto,
        password: this.password,
        data_nasc: this.data_nasc
      };
      axios.post(API_URL, data)
        .then(
          Response => this.validateSignup(Response)
        );
    }
  }
};
</script>