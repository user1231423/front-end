<template>
  <v-app style="background: #E3E3EE">
  <!-- No login toolbar -->
    <v-toolbar v-if="!logged">
      <v-toolbar-title>
        <router-link to="/" tags="span" style="cursor: pointer; text-decoration: none;">
          <h1>Cars</h1>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in offlineNavMenu" :key="item.icon" :to="item.link" flat>
          <v-icon class="margin">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list class="pa-1">
          <v-list-tile v-for="item in offlineNavMenu" :key="item.icon" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

<!-- Logged in toolbar -->
    <v-toolbar v-if="logged">
      <v-toolbar-title>
        <router-link to="/" tags="span" style="cursor: pointer; text-decoration: none;">
          <h1>Cars</h1>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in onlineNavMenu" :key="item.icon" :to="item.link" flat>
          <v-icon class="margin">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list class="pa-1">
          <v-list-tile v-for="item in onlineNavMenu" :key="item.icon" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-container class="mt-4">
      <transition name="fade">
        <router-view/>
      </transition>
    </v-container>

  </v-app>
</template>

<script>
const API_URL = "http://localhost:3000/";
import axios  from "axios";
import router from "./router";
export default {
  name: "App",
  data() {
    return {
      logged: null,
      messages: ""
    };
  },
  computed: {
    offlineNavMenu() {
      return [
        { icon: "lock_open", title: "Sign In", link: "/users/login" },
        { icon: "create", title: "Sign Up", link: "/users/signup" }
      ];
    },
    onlineNavMenu() {
      return [
        { icon: "home", title: "Home", link: "/home" },
        { icon: "search", title: "Search", link: "/search" },
        { icon: "lock_open", title: "Profile", link: "/profile" },
        { icon: "house", title: "Chat", link: "/chat" },
        { icon: "lock", title: "Create Post", link: "/posts/create" },
        { icon: "create", title: "My Posts", link: "/posts/show" },
        { icon: "exit_to_app", title: "Logout", link: "/logout" }
      ];
    }
  },
  methods: {
    checkData(){
      var config = {
        withCredentials: true
      };
      axios
        .get(API_URL,config)
        .then(Response => (
          this.handleResponse(Response)
        ))
    },
    redirect(){
      if(this.logged == true){
        router.push("/home");
      }
    },
    handleResponse(res){
      if(res.data.logged == true){
        this.logged = true;
      }else{
        this.logged = false;
      }
      this.redirect();
    }
  },
  mounted(){
    this.checkData();
  }
};
</script>
<style scoped>
.margin {
  margin-right: rem;
}
</style>
