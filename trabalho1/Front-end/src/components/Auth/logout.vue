<template></template>


<script>
const API_URL = "http://localhost:3000/users/logout";
import axios from "axios";
import router from "../../router";

export default {
  name: "Logout",
  data() {
    return {};
  },
  methods: {
    confirmLogout(res) {
      router.go("/");
      router.push({ name: "home" });
    }
  },
  mounted() {
    var config = {
      withCredentials: true
    };
    axios
      .delete(API_URL, config)
      .then(Response => this.confirmLogout(Response))
      .catch(error => router.push({ name: "home" }));
  }
};
</script>