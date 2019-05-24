<template>
  <v-app style="background: #E3E3EE">
    <v-toolbar>
      <v-toolbar-title>
        <router-link to="/" tags="span" style="cursor: pointer; text-decoration: none;">
          <h1>Cars</h1>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in navMenu" :key="item.icon" :to="item.link" flat>
          <v-icon class="margin">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list class="pa-1">
          <v-list-tile v-for="item in navMenu" :key="item.icon" :to="item.link">
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
export default {
  name: "App",
  data() {
    return {
    };
  },
  computed: {
    navMenu() {
      return [
        { icon: "home", title: "Home", link: "/" },
        { icon: "lock_open", title: "Sign In", link: "/login" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ];
    }
  },
  methods: {}
};
</script>
<style scoped>
.margin {
  margin-right: rem;
}
</style>
