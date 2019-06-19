<template>
  <v-container height="40rem" flat>
    <v-container v-if="bottomNav == 'recent'">
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Recent Messages</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-tile v-else :key="item.title" avatar>
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-container>

    <v-container v-if="bottomNav == 'startNew'">
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Friends</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-text-field prepend-icon="search" single-line></v-text-field>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in friends">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-tile v-else :key="item.name" avatar @click>
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-container>

    <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="white">
      <v-btn color="teal" flat value="recent">
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="startNew">
        <span>New Chat</span>
        <v-icon>create</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-container>
</template>

<script>
export default {
  name: "createPost",
  data() {
    return {
      bottomNav: "recent",
      items: [
        { header: "Today" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ],
      friends: [
        { header: "Friend List" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "Brunch this weekend?"
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          name: "Summer BBQ"
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Name"
        }
      ]
    };
  },
  methods: {}
};
</script>