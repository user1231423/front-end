<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex md5>
        <v-card theme--light>
          <v-img src="https://www.freeiconspng.com/uploads/user-login-icon-14.png"></v-img>
          <v-card-text text-xs-center>
            <h1 class="card-title font-weight-light">{{ name }}</h1>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const API_URL = "http://localhost:3000/profile";
import axios from "axios";
import router from "../../router";
export default {
  name: "Profile",
  data() {
    return {
        name: ""
    };
  },
  methods: {
    buildProfile(res){
      this.name = res.data.user.nome
    }
  },
  mounted() {
    var config = {
      withCredentials: true
    };
    axios
      .get(API_URL, config)
      .then(Response =>
        this.buildProfile(Response)
      )
      .catch(error => router.push("/"));
  }
};
</script>