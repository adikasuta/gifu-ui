<template>
    <div class="carrousel">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="chevron"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <CarouselContent
      v-for="item in PackagingSouvenir"
          :key="item.name"
          :img="item.img"
          :name="item.name"
          ></CarouselContent>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="chevron"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  </template>
  
  <script>
  import PackagingSouvenir from "../../../../assets/PackagingSouvenir.json"
  import CarouselContent from "../OrderForm/CarouselContent.vue";
  export default {
    components: { CarouselContent },
    data() {
      return {
        status: "",
        PackagingSouvenir
      };
  }
  }
  </script>
  
  <style scoped>
  .chevron {
      width: 30px;
  }
  .carrousel{
      display: flex;
      gap: 20px;
  }
  </style>