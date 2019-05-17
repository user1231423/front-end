<template>
  <ion-app>
    <ion-vue-router />
    <!-- Listen to before and after tab change events -->
    <ion-tabs >
      <ion-tab tab="Login">
      </ion-tab>

      <!-- Match by "app.speakers" route name -->
      <ion-tab tab="Dashboard">
      </ion-tab>

      <!-- Use v-slot:bottom with Vue ^2.6.0 -->
      <template slot="bottom">
        <ion-tab-bar>
          <ion-tab-button tab="login">
            <ion-icon name="person"></ion-icon>
            <ion-label>Login</ion-label>
          </ion-tab-button>

          <!-- Provide a custom route to navigate to -->
          <ion-tab-button tab="/dashboard">
            <ion-icon name="home"></ion-icon>
            <ion-label>Dashboard</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </template>
    </ion-tabs>
  </ion-app>
</template>

<script>
//import Home from "./components/Home"
export default {
  name: 'App',
  components: {
  }
}
</script>
