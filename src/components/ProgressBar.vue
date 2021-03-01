<template>
  <div class="root">
    <div class="container">
      <ul class="progressbar">
        <li
          v-bind:class="{
            correct: answerCorrectnessArray[i] == true,
            incorrect: answerCorrectnessArray[i] == false,
          }"
          v-for="i in length"
          :key="i"
        ></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["length", "questionsLeft", "isCorrect"],
  data() {
    return {
      answerCorrectnessArray: []
    };
  },
  watch: {
    questionsLeft: function () {
      this.answerCorrectnessArray.push(this.isCorrect)
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  position: relative;
  z-index: 1;
}
.progressbar li {
  list-style-type: none;
  float: left;
  width: 10%;
  position: relative;
  text-align: center;
}

.progressbar {
  counter-reset: step;
}
.progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 30px;
  height: 30px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 27px;
  background: white;
  color: #bebebe;
  text-align: center;
  font-weight: bold;
}

.progressbar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  background: #979797;
  top: 15px;
  left: -50%;
  z-index: -1;
}

.progressbar li.correct:before{
  border-color: #669644;
  background: #82BF56;
  color: white
}

.progressbar li.correct:after{
  background: #82BF56;
}

.progressbar li.correct + li:after{
  background: #82BF56;
}

.progressbar li.correct + li:before{
  border-color: #669644;
  background: #82BF56;
  color: white
}

.progressbar li.incorrect:before{
   border-color: #BD3E31;
  background: #E74C3C;
  color: white
}

.progressbar li.incorrect:after{
  background: #E74C3C;
}

.progressbar li.incorrect + li:after{
  background: #E74C3C;
}

.progressbar li.incorrect + li:before{
  border-color: #BD3E31;
  background: #E74C3C;
  color: white
}

.progressbar li:first-child:after{
  content: none;
}
</style>