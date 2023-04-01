<template>
  <div>
    <VueRadioButton v-model="selectedButton" :options="options">
    <template #label="{ props }">
        <img :src="props.icon" width="100" height="100" />
        <span>{{ props.title }}</span>
    </template>
  </VueRadioButton>
  </div>
  
</template>

<script>
import VueRadioButton from "vue-radio-button";
export default {
  components: { VueRadioButton },
  props: [],
  data: () => ({
    card: 0,
    selectedButton: "",
    options: [
      {
        id: 1,
        icon: "https://vuejs.org/images/logo.svg",
        title: "Vue",
      },
      {
        id: 2,
        icon: "https://vitejs.dev/logo.svg",
        title: "Vite",
      },
    ],
  }),
};
</script>

<style>
  .v-radio-label {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    margin: 5px;
    border-radius: 4px;
    border: 1px solid #eee;
    transition: all 500ms;
  }

  .v-radio-active {
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  }
</style>
