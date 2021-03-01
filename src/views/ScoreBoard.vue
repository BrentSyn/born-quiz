<template>
  <div class="score d-flex align-items-center">
    <div class="card w-75 animated bounce text-center py-4 px-5 mb-3 mx-auto">
      <h3>ScoreBoard</h3>

      <div class="container mb-4 px-5">
        <div class="d-flex justify-content-between mb-4">
          <span>Taken on</span>
          <span>Username</span>
          <span class="text-right">Score</span>
        </div>
        <div v-if="scores.length">
          <div
            class="d-flex justify-content-between"
            v-for="score in scores"
            :key="score.id"
          >
            <span>{{ score.createdOn | formatDate }}</span>
            <span>{{ score.userName }}</span>
            <span>{{ score.score }} / {{ score.maxScore }}</span>
          </div>
        </div>
      </div>

      <div class="w-100">
        <router-link class="w-100 d-flex justify-content-center" to="/">
          <button class="w-50 action-button animate green">Go to start</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import '@/assets/bootstrap.min.css'

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['scores'])
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }
      let date = val.toDate()
      return moment(date).fromNow()
    }
  },
};
</script>

<style>
.score {
  min-height: 100vh;
}
</style>