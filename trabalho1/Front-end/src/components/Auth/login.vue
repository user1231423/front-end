<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex md5>
        <v-card class="elevation-3" width="500">
          <v-toolbar color="accent">
            <h2>Login</h2>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-on:submit.prevent="login" id="submitform">
              <v-text-field
                v-model="email"
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-flex text-center>
                  <v-btn type="submit" color="primary" form="submitform">Login</v-btn>
                </v-flex>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const API_URL = "http://localhost:3000/register/login";

import router from "../../router";
import axios from "axios";
import app from "../../App";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    failLogin() {
      console.log("Login failed");
    },
    validateLogin(res) {
      if (res.data.logged == true) {
        var config = {
            withCredentials: true
        };
        var send = res.data.logged;
        router.go('/');
      } else {
        this.failLogin();
        router.go("/users/login");
      }
    },
    login() {
      var data = {
        email: this.email,
        password: this.password
      };
      var config = {
        withCredentials: true
      };
      axios
        .post(API_URL, data, config)
        .then(Response => 
            this.validateLogin(Response)
        );
    }
  }
};
</script>