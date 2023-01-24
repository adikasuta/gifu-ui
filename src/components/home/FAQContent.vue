<template>
  <div class="items">
    <div class="accordion">
      <div class="item">
        <p class="question">{{ question }}</p>
        <svg @click="toggleDetails"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>

        <div v-if="detailsAreVisible">{{ answer }}</div>
      </div>
    </div>
    <!-- <h3>{{ question }}</h3>
    <v-btn icon @click="toggleDetails">
      <v-icon>{{
        toggleDetails ? "mdi-chevron-down" : "mdi-chevron-up"
      }}</v-icon>
    </v-btn>
    <div v-if="detailsAreVisible">
      <v-divider></v-divider>

      <v-card-text>
        {{ answer }}
      </v-card-text>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      detailsAreVisible: false,
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  },
};
</script>

<style scoped>
.accordion {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.26);
  margin: 1rem;
  border-radius: 3px;
  padding: 1rem;
  text-align: center;
  width: 500px;
  background-color: rgb(255, 235, 239);
  gap:10px;
}
.item {
  display: grid;
  grid-template-columns: 12fr auto;
  align-items: baseline;
}
.question {
  font-size: 20px;
}
.icon {
  width: 20px;
  stroke: rgb(23, 16, 122);
}
.answer {
  line-height: 1.6;
  margin-bottom: 20px;
  grid-column: 1;
}
</style>