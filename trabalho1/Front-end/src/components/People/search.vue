<template>
  <v-container>
    <v-card>
      <v-card-title>
        People
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          v-on:change="queryDB"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search" style="cursor: pointer">
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.user_id }}</td>
          <td class="text-xs-left">{{ props.item.nome }}</td>
          <td class="text-xs-left">{{ props.item.contacto }}</td>
          <td class="text-xs-left">{{ props.item.data_nasc }}</td>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>


<script>
const API_URL = "http://localhost:3000/users/find";
import axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      search: "",
      headers: [
        { text: "Id", value: "user_id" },
        { text: "Nome", value: "nome" },
        { text: "Contacto", value: "contacto" },
        { text: "Birthday", value: "data_nasc" }
      ],
      data: []
    };
  },
  methods: {
    fillData(res) {
      this.data = res.data;
    },
    queryDB() {
      var search = this.search;
      var config = {
        withCredentials: true
      };
      axios
        .post(API_URL, { search }, config)
        .then(Response => this.fillData(Response));
    }
  }
};
</script>