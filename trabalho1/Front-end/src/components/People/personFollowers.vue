<template>
  <div>
    <v-layout row>
      <v-flex>
        <template v-for="(user, index) in users">
          <v-layout :key="index" spacer>
            <v-flex xs8>
              <v-img :src="user.img" height="125px" contain></v-img>
            </v-flex>
            <v-flex xs3>
              <v-card-title primary-title>
                <div>
                  <div class="headline" v-html="user.nome"></div>
                  <div v-html="user.email"></div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </template>
        <div v-if="users.length === 0" class="text-xs-center">
          <v-progress-circular indeterminate color="primary"/>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
const API_URL = "http://localhost:3000/friends/person/followers";

import axios from "axios";

export default {
  name: "personFollowers",
  data() {
    return {
      users: [],
      received: [],
      config: {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      }
    };
  },
  methods: {
    checkResponse(res) {
      if (res.data == "No followers!") {
        this.received = [];
      } else if (res.data.length != 0) {
        this.received = res.data;
        this.addPost();
      }
    },
    addPost() {
      var singleUser = {};
      for (var i = 0; i < this.received.length; i++) {
        singleUser = {
          img: this.received[i].caminho,
          contacto: this.received[i].contacto,
          id: this.received[i].user_id,
          data_nasc: this.received[i].data_nasc,
          nome: this.received[i].nome
        };
        if (!this.received[i].caminho) {
          singleUser.img =
            "http://www.emaar.in/app/webroot/img/products/album-default.png";
        }
        this.users.push(singleUser);
      }
    }
  },
  created() {
    var id = this.$route.params.id;

    var config = {
      withCredentials: true
    };
    axios
      .post(API_URL, { id }, config)
      .then(Response => this.checkResponse(Response));
  }
};
</script>

<style scoped>
.spacer {
  margin-bottom: 2rem;
}

.text-xs-center {
  margin-top: 20%;
}
</style>
