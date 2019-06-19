<template>
  <v-card height="40rem">
    <v-navigation-drawer permanent absolute>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
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
        <v-list-tile v-for="item in NavMenu" :key="item.icon" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-card  class="postCards" height="40rem">
      <show/>
    </v-card>
  </v-card>
</template>

<script>
const API_URL = "http://localhost:3000/users/profile";
import axios from "axios";
import router from "../../router";
import show from "../Posts/show"
export default {
  name: "Profile",
  data() {
    return {
      name: "",
      imgPath: "http://simpleicon.com/wp-content/uploads/user1.png"
    };
  },
  components:{
    show
  },
  computed: {
    NavMenu() {
      return [
        { icon: "person", title: "Friends", link: "/users/fiendlist" },
        { icon: "question_answer", title: "About", link: "/users/about" },
        { icon: "settings", title: "Options", link: "/users/settings" }
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
    var config = {
      withCredentials: true
    };
    axios.get(API_URL, config).then(Response => this.buildProfile(Response));
  }
};
</script>

<style scoped>
.postCards{
  margin-left: 20rem;
  margin-right: 0;
  overflow-y: auto;
}
</style>
