<template>
  <section class="movies-container">
    <transition mode="out-in">
      <div
        v-if="movies && movies.length"
        class="movies"
        key="movies"
      >
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="movie"
        >
          <router-link :to="{name: 'movie', params:{id: movie.id, title:movie.title} }">
            <img
              v-if="movie.poster_path"
              :src="`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`"
              :alt="movie.title"
            >
            <h2 class="title">
              {{movie.title}}
            </h2>
          </router-link>
        </div>
      </div>
      <div
        v-else-if="movies && movies.length === 0"
        key="without-results"
      >
        <p class="without-results">Busca sem resultados. Tente buscar outro termo.</p>
      </div>
      <LoadingPage
        v-else
        key="loading"
      />
    </transition>
  </section>
</template>

<script>
export default {
  name: "MoviesList",
  data() {
    return { movies: null };
  },
  methods: {
    async getMovies() {
      await this.$axios
        .$get(
          `/movie/popular?api_key=${this.$config.tmdb_api_key}&language=pt-BR&page=1`
        )
        .then((r) => {
          this.movies = r.results;
        });
    },
    searchMovies() {
      this.movies = null;
      this.$axios.$get(this.searchUrl).then((r) => {
        this.movies = r.results;
      });
    },
  },
  computed: {
    searchUrl() {
      let queryString = "";
      for (let key in this.$route.query) {
        queryString += `&${key}=${this.$route.query[key]}`;
      }
      return (
        `/search/movie/?api_key=${this.$config.tmdb_api_key}` + queryString
      );
    },
  },
  watch: {
    searchUrl() {
      this.searchMovies();
    },
  },
  created() {
    this.getMovies();
  },
};
</script>

<style scoped>
.movies-container {
  max-width: 1000px;
  margin: 0 auto;
}

.movies {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}

.movie {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  transition: all 0.2s;
}
.movie img {
  margin: 10px auto;
}
.movie:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  z-index: 1;
}

.movies-container {
  max-width: 1000px;
  margin: 0 auto;
}

.without-results {
  text-align: center;
}

.title {
  margin-bottom: 10px;
  text-align: center;
}
</style>