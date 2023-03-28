<template>
    <v-img :src="fileUrl" :max-width="maxWidth"></v-img>
  </template>
  
  <script>
  const BASE_URL =
    process.env.VUE_APP_BACKEND_BASE_URL || "http://localhost:3000";
  export default {
    props: ["filename","maxWidth", "isPreview"],
    computed:{
      fileUrl(){
        if(this.isPreview){
          return this.filename;
        }
         return BASE_URL+"/api/public/assets/images?filename="+this.filename
      }
    }
  };
  </script>
  
  <style scoped></style>
  