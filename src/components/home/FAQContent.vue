<template>
    <div class="items">
    <h2 @click="toggleDetails">{{ question }}</h2>
    <h3 v-if="detailsAreVisible">
        <strong>Answer:</strong>
        {{ answer }}
    </h3>
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
      required: true
    }
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
div {
  text-align: center;
}
</style>