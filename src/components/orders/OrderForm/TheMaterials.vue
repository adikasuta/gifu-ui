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
    <MaterialsContent
    v-for="item in MaterialSouvenir"
        :key="item.name"
        :img="item.img"
        :name="item.name"
        ></MaterialsContent>
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
import MaterialSouvenir from "../../../../assets/MaterialSouvenir.json"
import MaterialsContent from "../OrderForm/MaterialsContent.vue";
export default {
  components: { MaterialsContent },
  data() {
    return {
      status: "",
      MaterialSouvenir
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