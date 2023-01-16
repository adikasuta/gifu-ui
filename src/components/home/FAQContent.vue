<template>
    <div class="items">
    <h3>{{ question }}</h3>
    <v-btn icon @click="toggleDetails">
                <v-icon>{{ toggleDetails? 'mdi-chevron-down': 'mdi-chevron-up' }}</v-icon>
            </v-btn>
            <div v-if="detailsAreVisible">
                <v-divider></v-divider>

                <v-card-text>
                    {{answer}}
                </v-card-text>
            </div>
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