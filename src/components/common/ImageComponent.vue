<template>
  <v-img :src="fileUrl" :max-width="maxWidth" :height="height"></v-img>
</template>

<script>
const BASE_URL =
  process.env.VUE_APP_BACKEND_BASE_URL || "http://localhost:3000";
export default {
  props: ["filename", "maxWidth", "isPreview", "height"],
  computed: {
    fileUrl() {
      if (this.isPreview) {
        return this.filename;
      }
      if(!this.filename){
        return "no_image.jpg";
      }
      return BASE_URL + "/public/api/assets/images?filename=" + this.filename;
    },
  },
};
</script>

<style scoped></style>
