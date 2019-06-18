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
            <v-flex xs5>
              <v-btn v-on:click="like(post.id)" icon color="blue">
                <v-icon>thumb_up</v-icon>
              </v-btn>
              <v-btn v-on:click="dislike(post.id)" flat icon color="deep-orange">
                <v-icon>thumb_down</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs5>
              <v-btn v-on:click="apagar(post.id)" flat icon color="blue">
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn v-on:click="editar(post.id)" flat icon color="deep-orange">
                <v-icon>create</v-icon>
              </v-btn>
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
const API_URL = "http://localhost:3000/posts/show";
const API_LIKES = "http://localhost:3000/posts/likes";
const API_DISLIKES = "http://localhost:3000/posts/dislikes";
const API_DELETE = "http://localhost:3000/posts/delete";

import axios from "axios";
import router from "../../router";
export default {
  name: "showPosts",
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
      axios.put(API_LIKES,{id},this.config).then(Response => router.go('/posts/show'));
    },
    dislike(id) {
      axios.put(API_DISLIKES,{id},this.config).then(Response => router.go('/posts/show'));
    },
    apagar(id) {
      axios.post(API_DELETE,{id: id},this.config).then(Response => router.go('/posts/show'));
    },
    editar(id) {
      router.push("/posts/edit");
    },
    checkResponse(res) {
      if (res.data.length != 0) {
        this.received = res.data;
        this.addPost();
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
          date: this.received[i].date
        };
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
