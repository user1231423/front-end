<template>
  <div>
    <h2>Dashboard</h2>
    <p>Name: {{ user.name }}</p>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  name: "Profile",
  data() {
    return {
      user: {
        name: "Offline"
      }
    }
  },
  methods: {
    getUserData: function() {
      //let self = this;
      axios
        .get("/api/user")
        .then(
            function(response){
                console.log(response);
                self.$set(this,"user",response.data.user)
            }
        )
        .catch(function(errors){
          console.log(errors);
          router.push("/");
        });
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>