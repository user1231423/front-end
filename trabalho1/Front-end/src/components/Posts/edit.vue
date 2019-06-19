<template>
  <v-container>
    <v-alert
      :value="alertError"
      color="error"
      icon="warning"
      transition="scale-transition"
    >{{alertErrorTxt}}</v-alert>
    <v-layout align-center justify-center>
      <v-form v-on:submit.prevent="editForm">
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
const API_POST_INFO = "http://localhost:3000/posts/info";
const API_EDIT = "http://localhost:3000/posts/update";

import router from "../../router";
import axios from "axios";
export default {
  name: "createPost",
  data() {
    return {
      title: "",
      desc: "",
      alertError: false,
      alertErrorTxt: ""
    };
  },
  methods: {
    checkResponse(res) {
      this.title = res.data.title;
      this.desc = res.data.description;
    },
    editResponse(res) {
      if (res.data == "Nothing was changed") {
        this.alertError = true;
        this.alertErrorTxt = res.data;
      }else{
        router.go(-1);
      }
    },
    editForm() {
      var data = {
        id: this.$route.params.id,
        title: this.title,
        desc: this.desc
      };
      var config = {
        withCredentials: true
      };
      axios
        .put(API_EDIT, data, config)
        .then(Response => this.editResponse(Response));
    }
  },
  mounted() {
    var id = this.$route.params.id;
    var config = {
      withCredentials: true
    };
    axios
      .post(API_POST_INFO, { id }, config)
      .then(Response => this.checkResponse(Response));
  }
};
</script>