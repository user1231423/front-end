<template>
  <div>
    <v-layout row>
      <v-flex>
        <template v-for="(post, index) in posts">
          <v-layout :key="index" spacer>
            <v-flex xs5>
              <v-img :src="post.img" height="125px" contain></v-img>
            </v-flex>
            <v-flex xs5>
              <v-card-title primary-title>
                <div>
                  <div class="headline" v-html="post.title"></div>
                  <div v-html="post.desc"></div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs3>
              <v-btn v-on:click="like(post.id)" icon color="blue">
                <v-icon>thumb_up</v-icon>
              </v-btn>
              <h4 v-html="post.likes"></h4>
            </v-flex>
            <v-flex xs3>
              <v-btn v-on:click="dislike(post.id)" flat icon color="deep-orange">
                <v-icon>thumb_down</v-icon>
              </v-btn>
              <h4 v-html="post.dislikes"></h4>
            </v-flex>
            <v-flex xs5>
              <v-img :src="post.ownerImg" height="125px" contain></v-img>
            </v-flex>
            <v-flex xs5>
              <v-card-title primary-title>
                <div>
                  <div class="headline" v-html="post.ownerName"></div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </template>
        <div v-if="posts.length === 0">
          <v-progress-circular indeterminate color="primary" class="bottom"/>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
const API_URL = "http://localhost:3000/posts/friends";
const API_LIKES = "http://localhost:3000/posts/likes";
const API_DISLIKES = "http://localhost:3000/posts/dislikes";

import axios from "axios";
import router from "../router";

export default {
  name: "loggedHome",
  data() {
    return {
      posts: [],
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
    like(id) {
      axios
        .put(API_LIKES, { id }, this.config)
        .then(Response => router.go("/home"));
    },
    dislike(id) {
      axios
        .put(API_DISLIKES, { id }, this.config)
        .then(Response => router.go("/home"));
    },
    checkResponse(res) {
      console.log(res);
      if (res.data == "No posts to show!") {
        this.posts = [];
      } else {
        if (res.data.length != 0) {
          this.received = res.data;
          this.addPost();
        }
      }
    },
    addPost() {
      var singlePost = {};
      for (var i = 0; i < this.received.length; i++) {
        singlePost = {
          likes: this.received[i].likes,
          dislikes: this.received[i].dislikes,
          id: this.received[i].post_id,
          title: this.received[i].title,
          desc: this.received[i].description,
          date: this.received[i].date,
          ownerName: this.received[i].nome,
          ownerImg: this.received[i].img_user
        };
        if(!this.received[i].img_user){
          singlePost.ownerImg = "https://www.freeiconspng.com/uploads/user-login-icon-14.png";
        }else{
          singlePost.ownerImg = this.received[i].img_user;
        }
        if (!this.received[i].img) {
          singlePost.img =
            "http://www.emaar.in/app/webroot/img/products/album-default.png";
        } else {
          singlePost.img = this.received[i].img;
        }
        this.posts.push(singlePost);
      }
    }
  },
  created() {
    var config = {
      withCredentials: true
    };
    axios.get(API_URL, config).then(Response => this.checkResponse(Response));
  }
};
</script>

<style scoped>
.spacer {
  margin-bottom: 2rem;
}
</style>
