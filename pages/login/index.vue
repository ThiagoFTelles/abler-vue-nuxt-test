<template>
  <section class="login">
    <h1 class="login">Login</h1>
    <form>
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        v-model="login.username"
      >
      <label for="password">Senha</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="login.password"
      >
      <button
        class="btn"
        @click.prevent="getRequestToken"
      >Logar</button>
    </form>
    <p class="lost">
      <a
        href="https://www.themoviedb.org/reset-password"
        target="_blank"
      >Perdeu a senha? Clique aqui.</a>
    </p>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      requestToken: "",
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("user", ["updateSessionId", "updateLogin", "getUser"]),
    async getRequestToken() {
      await this.$axios
        .$get(`/authentication/token/new?api_key=${this.$config.tmdb_api_key}`)
        .then((r) => {
          this.requestToken = r.request_token;
          this.ValidateRequestToken();
        });
    },
    async ValidateRequestToken() {
      let requestBody = {
        username: this.login.username,
        password: this.login.password,
        request_token: this.requestToken,
      };
      await this.$axios
        .post(
          `/authentication/token/validate_with_login?api_key=${this.$config.tmdb_api_key}`,
          requestBody
        )
        .then(() => {
          this.getSessionId();
        });
    },
    async getSessionId() {
      try {
        await this.$axios
          .post(
            `/authentication/session/new?api_key=${this.$config.tmdb_api_key}`,
            { request_token: this.requestToken }
          )
          .then((r) => {
            this.updateSessionId(r.data.session_id);
          })
          .then(() => this.loginUser());
      } catch (e) {
        console.log(e);
      }
    },
    async loginUser() {
      this.updateLogin(true);
      await this.getUser();
      this.$router.push({ name: "user" });
    },
  },
  middleware: ["auth"],
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}
form {
  display: grid;
}
h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #91549e;
}
.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.lost {
  text-align: center;
  margin: 20px auto 0 auto;
}
.lost a:hover {
  color: #91549e;
  text-decoration: underline;
}
</style>