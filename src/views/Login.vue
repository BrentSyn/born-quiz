<template>
  <div id="login">
    <section>
      <div class="col1">
        <h1>Born to Quiz</h1>
        <p>Test your trivia knowledge with this small quiz</p>
      </div>
      <div class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Login</h1>
          <div>
            <label for="email1">Email</label>
            <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div>
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <a>Forgot Password</a>
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Name</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Your name" id="name" />
          </div>
          <div>
            <label for="email2">Email</label>
            <input v-model.trim="signupForm.email" type="email" placeholder="you@email.com" id="email2" />
          </div>
          <div>
            <label for="password2">Password</label>
            <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
          </div>
          <button @click="signup()" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'
export default {
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      })
    }
  }
}
</script>
<style scoped>

</style>