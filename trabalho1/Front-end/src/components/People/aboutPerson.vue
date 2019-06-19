<template>
  <v-flex xs12>
    <v-card>
      <v-layout align-center>
        <v-flex xs4 style="margin-left: 15rem">
          <v-img v-bind:src="imgPath" height="40rem" contain></v-img>
        </v-flex>
        <v-flex 8 xs>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ username }}</div>
              <br>
              <h4>Phone Number:</h4>
              <p>{{ contacto }}</p>
              <h4>Birthday</h4>
              <p>{{ data_nasc }}</p>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>


<script>
const API_URL = "http://localhost:3000/users/person";
import axios from "axios";
import router from "../../router";

export default {
  name: "aboutPerson",
  data() {
    return {
      username: "",
      contacto: "",
      data_nasc: "",
      imgPath: ""
    };
  },
  methods: {
    buildProfile(res) {
      if (!res.data.caminho) {
        this.imgPath = "http://simpleicon.com/wp-content/uploads/user1.png";
      } else {
        this.imgPath = res.data.caminho;
      }
      this.username = res.data.nome;
      this.contacto = res.data.contacto;
      this.data_nasc = res.data.data_nasc;
    }
  },
  mounted() {
    var id = this.$route.params.id;
    var config = {
      withCredentials: true
    };
    axios.post(API_URL,{id} ,config).then(Response => this.buildProfile(Response));
  }
};
</script>

<style scoped>
</style>
