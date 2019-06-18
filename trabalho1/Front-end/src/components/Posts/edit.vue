<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-form v-on:submit.prevent="createForm">
        <v-card class="mx-auto" width="50rem">
          <v-card-title>
            <span class="title font-weight-bold">Edit your post</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="title" name="title" label="Title" type="text"></v-text-field>
            <v-textarea v-model="desc" name="input" label="What are you thinking about?" value></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-layout align-center justify-end>
              <v-btn type="submit" color="primary">Edit</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
const API_URL = "http://localhost:3000/posts/create";
import router from "../../router";
import axios from "axios";
export default {
  name: "createPost",
  data() {
    return {
      title: "fsdf",
      desc: "dsfdsf"
    };
  },
  methods: {
    checkResponse(res){
      if(res.data != 0){
        router.push('/posts/show');
      }
    },
    editForm() {
      var data = {
        title: this.title,
        desc: this.desc
      };
      var config = {
        withCredentials: true
      };
      axios
        .put(API_URL, data, config)
        .then(Response => this.checkResponse(Response));
    }
  }
};
</script>