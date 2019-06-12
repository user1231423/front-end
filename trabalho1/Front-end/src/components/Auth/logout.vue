<template>
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
    confirmLogout(res){
      if(res.data.isLoggedOut == true){
        router.go("/");
      }else{
        console.log("Impossivel to logout")
      }
    }
  },
  mounted() {
    var config = {
      withCredentials: true
    };
    axios
      .delete(API_URL, config)
      .then(Response =>
        this.confirmLogout(Response)
      )
  }
};
</script>