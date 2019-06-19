<template>
  <div>
    <v-layout row>
      <v-flex>
        <template v-for="(user, index) in users">
          <v-layout :key="index" spacer>
            <v-flex xs6>
              <v-img :src="user.img" height="125px" contain></v-img>
            </v-flex>
            <v-flex xs4>
              <v-card-title primary-title>
                <div>
                  <div class="headline" v-html="user.nome"></div>
                  <div v-html="user.email"></div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs2>
              <v-btn v-on:click="aceitar(user.relation_id)" flat icon color="green">
                <v-icon>done</v-icon>
              </v-btn>
              <v-btn v-on:click="rejeitar(user.relation_id)" flat icon color="deep-orange">
                <v-icon>clear</v-icon>
              </v-btn>
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
const API_URL = "http://localhost:3000/friends/requests";
const API_DECISION = "http://localhost:3000/friends/decision";
import axios from "axios";
import router from "../../router";

export default {
  name: "friendRequests",
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
    handleResponse(res){
        if(res.data.friends == true){
            router.go('/profile');
        }else{
            router.go('/profile')
        }
    },
    checkResponse(res) {
      if (res.data == "No requests received!") {
        this.received = [];
      } else if (res.data.length != 0) {
        this.received = res.data;
        this.addPost();
      }
    },
    aceitar(id) {
        axios.put(API_DECISION,{id, decision: true},this.config).then(Response => this.handleResponse(Response));
    },
    rejeitar(id) {
        axios.put(API_DECISION,{id, decision: false},this.config).then(Response => this.handleResponse(Response));
    },
    addPost() {
      var singleUser = {};
      for (var i = 0; i < this.received.length; i++) {
        singleUser = {
          img: this.received[i].caminho,
          contacto: this.received[i].contacto,
          id: this.received[i].user_id,
          data_nasc: this.received[i].data_nasc,
          nome: this.received[i].nome,
          relation_id: this.received[i].relation_id
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
    var config = {
      withCredentials: true
    };
    axios
      .get(API_URL, config)
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
