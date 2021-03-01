<template>
  <div class="quiz d-flex align-items-center">
    <div class="card w-75 text-center py-4 mx-auto">
      <progressBar :isCorrect='isCorrect' :questionsLeft="questions.length" :length="10"></progressBar>
      <question v-bind:question="question"></question>
      <answers
        v-bind:answers="object"
        v-on:nextQuestion="getQuestion($event)"
      ></answers>
    </div>
  </div>
</template>

<script>
import Question from "@/components/Question.vue";
import Answers from "@/components/Answers.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import '@/assets/bootstrap.min.css'

export default {
  components: {
    question: Question,
    answers: Answers,
    progressBar: ProgressBar
  },
  data: function () {
    return {
      questions: this.$store.state.questions,
      question: "",
      object: {},
      isCorrect: true,
      result: {
        corrects: 0,
        incorrects: 0,
      },
      quizActive: true,
    };
  },
  methods: {
    getQuestion: function (answer) {
      if (answer) {
        this.isCorrect = true
        this.result.corrects++;
      } else if (answer == false) {
        this.isCorrect = false
        this.result.incorrects++;
      }
      if (this.questions[0]) {
        this.quizActive = true;
        this.object = this.questions.shift();
        this.question = this.object.question;
      } else {
        this.$store.commit("setResults", this.result);
        this.$router.push({ name: "Results" });
      }
    },
  },
  created() {
    this.getQuestion();
  },
};
</script>

<style scoped>
.quiz {
  min-height: 100vh;
}
</style>