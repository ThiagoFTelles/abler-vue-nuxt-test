export default {
  updateLogin({ commit }, payload) {
    commit("UPDATE_LOGIN", payload);
  },
  updateSessionId({ commit }, payload) {
    commit("UPDATE_SESSION_ID", payload);
  },
  async getUser({ commit }) {
    return await this.$axios
      .$get(
        `/account?api_key=${this.$config.tmdb_api_key}&session_id=${this.state.user.sessionId}`
      )
      .then((response) => {
        commit("UPDATE_USER", response);
      });
  },
};
