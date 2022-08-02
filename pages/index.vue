<template>
  <section>
    <h1>✨ Filmes Populares ✨</h1>
    <MoviesSearch />
    <MoviesList />
  </section>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #91549e;
  margin-top: 40px;
  text-align: center;
}
</style>