<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Logout page</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
const API_URL = "http://localhost:3000/users/logout";
import axios from "axios";
import router from "../../router";

export default {
  name: "Logout",
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    var config = {
      withCredentials: true
    };
    axios
      .delete(API_URL, config)
      .then(Response =>
        router.push("/")
      )
      .catch(error => router.push("/"));
  }
};
</script>