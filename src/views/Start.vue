<template>
  <div class="start d-flex align-items-center">
    <div class="card w-50 text-center py-4 mx-auto">
      <div class="w-75 mx-auto">
        <!-- <img src="../assets/logo.png" alt="" class="img-fluid"> -->
      </div>

      <h1>Born 2 Quiz</h1>

      <div class="w-50 mx-auto" id="btn-container">
        <button
          class="action-button animate green w-100 mb-3"
          v-on:click="getQuestions()"
        >
          Play
        </button>
        <router-link to="/login">
          <button v-on:click="logout()" class="action-button animate red w-100 mb-3">Logout</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/bootstrap.min.css'

export default {
  name: "start",
  data() {
    return {};
  },
  methods: {
    getQuestions() {
      var router = this.$router;
      this.$store
        .dispatch("getQuestions")
        .then(function(data) {
          console.log(data);
          router.push({
            name: "Quiz",
          });
        })
        .catch(function(data) {
          console.log(data);
        });
    },
    logout() {
      this.$store.dispatch('logout')
    }
  },
};
</script>

<style scoped>
.start {
  height: 100vh;
}
</style>