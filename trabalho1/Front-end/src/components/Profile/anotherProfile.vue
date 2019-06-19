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
      <v-flex>
        <v-btn
          v-if="follow == false"
          depressed
          large
          color="primary"
          style="width: 94%"
          v-on:click="startFollow"
        >Follow</v-btn>
        <v-btn
          v-if="follow == true"
          depressed
          large
          style="width: 94%"
          v-on:click="unfollow"
        >Unfollow</v-btn>
        <v-btn
          v-if="follow == 'Pending'"
          depressed
          large
          style="width: 94%"
          v-on:click="unfollow"
        >Request Sent</v-btn>
        <v-btn
          v-if="follow == 'Self'"
          depressed
          large
          style="width: 94%"
          disabled
        >Follow</v-btn>
      </v-flex>
    </v-navigation-drawer>
    <v-card v-if="nav== 0" class="postCards" height="40rem">
      <personPosts/>
    </v-card>
    <v-card v-if="nav== 1" class="postCards" height="40rem">
      <friendList/>
    </v-card>
    <v-card v-if="nav== 2" class="postCards" height="40rem">
      <personFollowers/>
    </v-card>
    <v-card v-if="nav== 3" class="postCards" height="40rem">
      <about/>
    </v-card>
  </v-card>
</template>

<script>
const API_URL = "http://localhost:3000/users/person";
const API_CHECKFOLLOW = "http://localhost:3000/friends/check/follow";
const API_DELETE_RELATION = "http://localhost:3000/friends/request/delete";
const API_SEND_REQUEST = "http://localhost:3000/friends/request";
import axios from "axios";
import router from "../../router";
import personPosts from "../Posts/personPosts";
import friendList from "../People/personFriendList";
import about from "../People/aboutPerson";
import personFollowers from "../People/personFollowers";

export default {
  name: "Profile",
  data() {
    return {
      name: "",
      imgPath: "http://simpleicon.com/wp-content/uploads/user1.png",
      nav: 0,
      follow: false,
      relationID: ""
    };
  },
  components: {
    personPosts,
    friendList,
    about,
    personFollowers
  },
  computed: {
    NavMenu() {
      return [
        { icon: "person", title: "Following", nav: 1 },
        { icon: "person", title: "Followers", nav: 2 },
        { icon: "question_answer", title: "About", nav: 3 },
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
    checkFollow(res) {
      if (res.data.follow == "Self"){
        this.follow = "Self";
      }else if (res.data.follow == "Pending") {
        this.follow = "Pending";
        this.relationID = res.data.relationID;
      } else if (res.data.follow == true) {
        this.follow = true;
        this.relationID = res.data.relationID;
      } else {
        this.follow = false;
      }
    },
    startFollow() {
      var config = {
        withCredentials: true
      };
      var id = this.$route.params.id;
      axios
        .post(API_SEND_REQUEST, { id }, config)
        .then(Response => router.go("/profile"));
    },
    unfollow() {
      var config = {
        withCredentials: true
      };
      var id = this.relationID;
      axios
        .post(API_DELETE_RELATION, { id }, config)
        .then(Response => router.go("/profile"));
    }
  },
  mounted() {
    var config = {
      withCredentials: true
    };
    var id = this.$route.params.id;
    axios
      .post(API_URL, { id }, config)
      .then(Response => this.buildProfile(Response));

    axios
      .post(API_CHECKFOLLOW, { id }, config)
      .then(Response => this.checkFollow(Response));
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
