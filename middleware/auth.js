export default ({ redirect, store, route }) => {
  if (route.name == "login") {
    return store.state.user.login ? redirect("/user") : null;
  } else if (route.name == "user") {
    return store.state.user.login ? null : redirect("/login");
  }
};
