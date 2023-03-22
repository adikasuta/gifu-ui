<template>
    <v-container>
      <slot name="breadcrumb" ></slot>
      <EditVariantComponent class="mb-5 mt-5"/>
    </v-container>
  </template>
  
  <script>
  import EditVariantComponent from "../../../components/variant/EditVariantComponent";
  export default {
    name: "CreateVariantPage",
    components: {
      EditVariantComponent
    },
    data() {
      return {
      };
    },
    async created() {
      
    },
    methods: {
      
    },
  };
  </script>
  
  <style scoped></style>
  