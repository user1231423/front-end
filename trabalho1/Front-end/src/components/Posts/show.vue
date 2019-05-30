<template>
  <div>
    <v-layout row>
      <v-flex>
        <template v-for="(post, index) in posts">
          <v-card>
            <v-layout :key="index" spacer>
              <v-flex xs5>
                <v-img :src="post.img" height="125px" contain></v-img>
              </v-flex>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline" v-html="post.name"></div>
                    <div v-html="post.tagline"></div>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex>
                <v-btn flat icon color="blue" disabled>
                  <v-icon>thumb_up</v-icon>
                </v-btn>
                <v-btn flat icon color="deep-orange" disabled>
                  <v-icon>thumb_down</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </template>
        <div v-if="posts.length === 0">
          <v-progress-circular indeterminate color="primary" class="bottom"/>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "showPosts",
  data() {
    return {
      posts: [],
      received: [
        {
          name: "Brewdog Vs Beavertown 1 ",
          tagline: "Coffee And Cigarettes.",
          image_url: "https://images.punkapi.com/v2/227.png"
        },
        {
          name: "Brewdog Vs Beavertown 2",
          tagline: "Coffee And Cigarettes.",
          image_url: "https://images.punkapi.com/v2/227.png"
        }
      ]
    };
  },
  methods: {
    addPost() {
      var singlePost = {};
      for (var i = 0; i < this.received.length; i++) {
        singlePost = {
          name: this.received[i].name,
          img: this.received[i].image_url,
          tagline: this.received[i].tagline
        };
        this.posts.push(singlePost);
      }
    }
  },
  created() {
    this.addPost();
  }
};
</script>

<style scoped>
.spacer {
  margin-bottom: 2rem;
}
</style>
