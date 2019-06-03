<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-form>
        <v-card class="mx-auto" width="50rem">
          <v-card-title>
            <span class="title font-weight-bold">Create your new post</span>
          </v-card-title>
          <v-card-text>
            <v-text-field name="title" label="Title" type="text"></v-text-field>
            <v-textarea name="input" label="What are you thinking about?" value=""></v-textarea>
          </v-card-text>
          <v-card-actions>

              <v-list-tile-content>
                <v-btn color="secondary" @click="$refs.inputUpload.click()">Upload image</v-btn>
                <input v-show="false" name="inputUpload" ref="inputUpload" type="file" multiple: false>        
               </v-list-tile-content>

              <v-layout align-center justify-end>
                <v-btn color="primary">Create</v-btn>
              </v-layout>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "createPost",
  data() {
    return {};
  },
  methods: {}
};
</script>