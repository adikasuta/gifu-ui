<template>
  <v-img :src=fileUrl max-width="100"></v-img>
</template>

<script>
const BASE_URL =
  process.env.VUE_APP_BACKEND_BASE_URL || "http://localhost:3000";
export default {
  name: "SmallImage",
  props: ["filename"],
  computed:{
    fileUrl(){
       return BASE_URL+"/public/api/assets/images?filename="+this.filename
    }
  }
};
</script>

<style scoped></style>
