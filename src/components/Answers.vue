<template>
  <div class="answers">
    <div class="container">
      <div class="row px-3">
        <div class="col-md-6" v-for="option in options" v-bind:key="option.id">
          <div class="multiple-choice">
            <button
              v-bind:class="{
                blue: quizActive,
                disabled: !quizActive,
                red: (!quizActive && option != correct),
                yellow: (!quizActive && selected == option && selected != correct),
                green: (!quizActive &&  option == correct),
              }"
              v-on:click="pickOption(option)"
              class="action-button animate w-100 mb-3"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <button
          v-if="!quizActive"
          v-on:click="nextQuestion()"
          class="action-button animate w-100 blue my-3"
        >
          Next >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["answers"],
  data() {
    return {
      options: [],
      correct: "",
      quizActive: true,
      selected: "",
      status: false,
    };
  },
  methods: {
    assign: function () {
      (this.options = this.answers.answers),
      (this.correct = this.answers.correct_answer),
      (this.quizActive = true),
      (this.selected = "");
    },
    pickOption: function (option) {
      console.log(this.correct)
      this.selected = option;
      this.quizActive = false;
      if (this.correct == this.selected) this.status = true;
      else this.status = false;
    },
    nextQuestion: function () {
      this.$emit("nextQuestion", this.status);
    },
  },
  created() {
    this.assign();
  },
  watch: {
    '$props': {
      handler: function () {
        this.assign();
      },
      deep: true,
    },
  },
};
</script>