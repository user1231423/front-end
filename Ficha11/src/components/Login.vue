<template>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col size-md="6">
          <form>
            <div padding>
              <h3>Login</h3>
            </div>
            <div padding>
              <ion-label>Email</ion-label>
              <ion-item>
                <ion-input name="email" type="text" placeholder="Email"></ion-input>
              </ion-item>
              <br>
              <ion-label>Password</ion-label>
              <ion-item>
                <ion-input name="password" type="password" placeholder="Password"></ion-input>
              </ion-item>
            </div>
            <div padding>
              <ion-button size="large" type="submit">Login</ion-button>
            </div>
          </form>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped>
</style>
