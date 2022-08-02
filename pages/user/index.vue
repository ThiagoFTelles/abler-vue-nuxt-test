<template>
  <div>
    <h1>Olá {{user.name ? user.name : user.username}}</h1>
    <div v-if="userCreatedLists">
      <div
        class="list"
        v-for="(list, index) in userCreatedLists"
        :key="index"
      >
        <h3 class="name">
          {{list.name}}
        </h3>
        <p class="description">{{list.description}}</p>
      </div>
    </div>
    <p v-else>Você não criou nenhuma lista no DMDB</p>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  middleware: ["auth"],
  data() {
    return {
      details: [],
      userCreatedLists: null,
    };
  },
  methods: {
    async loadLists() {
      await this.$axios
        .$get(
          `/account/${this.user.id}/lists?api_key=${this.$config.tmdb_api_key}&language=pt-BR&session_id=${this.sessionId}&page=1`
        )
        .then((r) => {
          this.userCreatedLists = r.results;
        });
    },
  },
  computed: {
    ...mapState({
      sessionId: (state) => state.user.sessionId,
      user: (state) => state.user,
    }),
  },
  created() {
    this.loadLists();
  },
};
</script>

<style>
</style>