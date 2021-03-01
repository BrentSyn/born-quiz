import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

// realtime firebase
fb.scoresCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let scoresArray = []

  snapshot.forEach(doc => {
    let score = doc.data()
    score.id = doc.id

    scoresArray.push(score)
  })

  store.commit('setScores', scoresArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    questions: [],
    results: { correct_answers: 0, incorrect_answers: 0 },
    scores: []
  },

  getters: {
    getScore(state) {
      var total = state.results.correct_answers + state.results.incorrect_answers;
      return state.results.correct_answers + " / " + total
    }
  },

  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    translateData: function (state, questions) {
      for (var i = 0; i < questions.length; i++) {
        questions[i].question = htmlDecode(questions[i].question);
        questions[i].correct_answer = htmlDecode(questions[i].correct_answer);
        for (var j = 0; j < questions[i].incorrect_answers.length; j++) {
          questions[i].incorrect_answers[j] = htmlDecode(questions[i].incorrect_answers[j]);
        }
        questions[i].answers = [].concat(questions[i].correct_answer, questions[i].incorrect_answers);
        shuffle(questions[i].answers);
      }

      state.questions = questions;
    },
    setResults(state, answers) {
      state.results.correct_answers = answers.corrects;
      state.results.incorrect_answers = answers.incorrects;
    },
    setScores(state, val) {
      state.scores = val
    }
  },

  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        score: 0
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()

      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },
    getQuestions(context) {
      // get questions and answers from API
      return new Promise(function (resolve, reject) {
        Vue.http.get('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
          .then(function (data) {
            console.log(data.body.results);
            context.commit('translateData', data.body.results)
            resolve(true)
          })
          .catch(function (data) {
            console.log('Error:', data)
            reject(false)
          })
      })
    },
    async addScore({state}) {
      await fb.scoresCollection.add({
        createdOn: new Date(),
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        score: state.results.correct_answers,
        maxScore: state.results.correct_answers + state.results.incorrect_answers
      })
    }
  }
}),

  htmlDecode = function (input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
  },
  shuffle = function (answers) {
    for (let i = answers.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [answers[i - 1], answers[j]] = [answers[j], answers[i - 1]];
    }
    return answers;
  }

export default store