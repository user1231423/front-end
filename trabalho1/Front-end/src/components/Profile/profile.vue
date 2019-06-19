<template>
  <v-card height="40rem">
    <v-navigation-drawer permanent absolute>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar v-on:click="nav = 0">
            <v-list-tile-avatar>
              <img v-bind:src="imgPath">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in NavMenu" :key="item.title" v-on:click="nav = item.nav">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          <span v-if="item.title == 'Requests'">{{ requests }}</span>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-card v-if="nav== 0" class="postCards" height="40rem">
      <show/>
    </v-card>
    <v-card v-if="nav== 1" class="postCards" height="40rem">
      <friendList/>
    </v-card>
    <v-card v-if="nav== 2" class="postCards" height="40rem">
      <about/>
    </v-card>
    <v-card v-if="nav== 3" class="postCards" height="40rem">
      <friendRequests/>
    </v-card>
  </v-card>
</template>

<script>
const API_URL = "http://localhost:3000/users/profile";
const API_REQUESTS = "http://localhost:3000/friends/requests";
import axios from "axios";
import router from "../../router";
import show from "../Posts/show";
import friendList from "../People/friendList";
import about from "../People/about";
import friendRequests from "../People/friendRequests";

export default {
  name: "Profile",
  data() {
    return {
      name: "",
      imgPath: "http://simpleicon.com/wp-content/uploads/user1.png",
      nav: 0,
      requests: ""
    };
  },
  components: {
    show,
    friendList,
    about,
    friendRequests
  },
  computed: {
    NavMenu() {
      return [
        { icon: "person", title: "Following", nav: 1 },
        { icon: "question_answer", title: "About", nav: 2 },
        { icon: "person_add", title: "Requests", nav: 3 }
      ];
    }
  },
  methods: {
    buildProfile(res) {
      if (!res.data.caminho) {
        this.imgPath = "http://simpleicon.com/wp-content/uploads/user1.png";
      } else {
        this.imgPath = res.data.caminho;
      }
      this.name = res.data.nome;
    },
    setRequests(res){
      if(res.data == "No requests received!"){
        this.requests = ""
      }else{
        this.requests = res.data.length;
      }
    }
  },
  mounted() {
    var config = {
      withCredentials: true
    };
    axios.get(API_URL, config).then(Response => this.buildProfile(Response));
    axios.get(API_REQUESTS, config).then(Response => this.setRequests(Response));
  }
};
</script>

<style scoped>
.postCards {
  margin-left: 20rem;
  margin-right: 0;
  overflow-y: auto;
}
</style>
