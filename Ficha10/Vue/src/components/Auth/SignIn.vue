<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sign In</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-list no-lines>
            <form padding>
                <p>Email</p>
                <ion-item>
                    <ion-label hidden></ion-label>
                    <ion-input type="text"></ion-input>
                </ion-item>

                <p>Password</p>
                <ion-item>
                    <ion-label hidden></ion-label>
                    <ion-input type="password"></ion-input>
                </ion-item>

                <ion-row>
                    <ion-col text-center>
                        <ion-button>Submit</ion-button>
                    </ion-col>
                </ion-row>
            </form>
        </ion-list>
    </ion-content>
  </div>
</template>

<script>
import router from "../../router";
import axios from "axios";
export default {
  name: "Login",
  methods: {
    login: e => {
      e.preventDefault();
      let email = e.target.elements.email.value;
      let password = e.target.elements.password.value;
      let login = () => {
        let data = {
          email: email,
          password: password
        };
        axios
          .post("/api/login", data)
          .then(Response => {
            console.log("Logged in");
            router.push("/profile");
          })
          .catch(errors => {
            console.log(errors);
          });
      };
      login();
    }
  }
};
</script>

<style scoped>
.input-control {
  margin: 10px 0;
  font: inherit;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
}
</style>

