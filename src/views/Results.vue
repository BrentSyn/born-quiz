<template>
  <div class="results d-flex align-items-center">
    <div class="card w-75 animated bounce text-center py-4 mb-3 mx-auto">
      <div class="container">
        <h1>Result: {{ score }}</h1>
        <router-link to="/scoreboard">
          <button class="action-button animate blue my-2 w-100">Scoreboard</button>
        </router-link>
        <router-link to="/">
          <button class="action-button animate green w-100">Go to start</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/bootstrap.min.css'

export default {
  name: "results",
  data() {
    return {
      incorrects: this.$store.state.results.incorrect_answers,
      corrects: this.$store.state.results.correct_answers,
      score: this.$store.getters.getScore
    };
  },
  computed: {
  },
  methods: {
    saveScore: function() {
      this.$store.dispatch('addScore')
    },
  },
  created() {
    this.saveScore();
  },
};
</script>

<style>
.results {
  min-height: 100vh;
}
</style>