<template>
  <section>
    <div
      v-if="movie"
      class="movie"
    >
      <div class="poster">
        <img
          v-if="movie.poster_path"
          :src="`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`"
          :alt="movie.original_title"
        >
      </div>
      <div class="info">
        <h1 class="title">{{movie.title}}</h1>
        <h3 class="tagline">{{movie.tagline}}</h3>
        <div
          v-if="movie.genres"
          class="genres"
        >
          <div
            v-for="(genre, index) in movie.genres"
            :key="genre+index"
            class="genre"
          >{{genre.name}}
          </div>
        </div>
        <p class="overview">{{movie.overview}}</p>
      </div>
    </div>
    <LoadingPage
      v-else
      key="loading"
    />
  </section>
</template>

<script>
export default {
  name: "",
  props: {
    id: String,
    title: String,
  },
  data() {
    return { movie: null };
  },
  methods: {
    async getMovie() {
      await this.$axios
        .get(
          `/movie/${this.$route.params.id}?api_key=${this.$config.tmdb_api_key}&language=pt-BR`
        )
        .then((r) => {
          this.movie = r.data;
        });
    },
  },
  created() {
    this.getMovie();
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.title,
        },
      ],
    };
  },
};
</script>

<style>
</style>