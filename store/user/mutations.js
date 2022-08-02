export default {
  UPDATE_LOGIN(state, payload) {
    state.login = payload;
  },
  UPDATE_SESSION_ID(state, payload) {
    state.sessionId = payload;
  },
  UPDATE_USER(state, payload) {
    state.user = Object.assign({}, state.user, payload);
  },
};
