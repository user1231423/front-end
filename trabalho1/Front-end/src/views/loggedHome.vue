<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">{{welcome}}</h1>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
const API_URL = "http://localhost:3000/users/home";
import axios from "axios";

export default {
  name: "loggedHome",
  data() {
    return {
      welcome: "Welcome Home"
    };
  },
  methods: {},
  mounted() {
    var config = {
      withCredentials: true
    };
    axios.get(API_URL,config).then(Response => (this.welcome = Response.data.message));
  }
};
</script>