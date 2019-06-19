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
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-card v-if="nav== 0" class="postCards" height="40rem">
      <personPosts/>
    </v-card>
    <v-card v-if="nav== 1" class="postCards" height="40rem">
      <friendList />
    </v-card>
    <v-card v-if="nav== 2" class="postCards" height="40rem">
    </v-card>
    <v-card v-if="nav== 3" class="postCards" height="40rem">
    </v-card>
  </v-card>
</template>

<script>
const API_URL = "http://localhost:3000/users/person";
import axios from "axios";
import router from "../../router";
import personPosts from "../Posts/personPosts";
import friendList from "../People/personFriendList";

export default {
  name: "Profile",
  data() {
    return {
      name: "",
      imgPath: "http://simpleicon.com/wp-content/uploads/user1.png",
      nav: 0
    };
  },
  components: {
    personPosts,
    friendList
  },
  computed: {
    NavMenu() {
      return [
        { icon: "person", title: "Friends", nav: 1 },
        { icon: "question_answer", title: "About", nav: 2 },
        { icon: "settings", title: "Options", nav: 3 }
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
    }
  },
  mounted() {
    var id = this.$route.params.id;
    var config = {
      withCredentials: true
    };
    axios
      .post(API_URL, { id }, config)
      .then(Response => this.buildProfile(Response));
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
