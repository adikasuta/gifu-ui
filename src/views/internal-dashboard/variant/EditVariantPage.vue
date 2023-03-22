<template>
    <v-container>
      <slot name="breadcrumb" ></slot>
      <EditVariantComponent :id="$route.params.id" class="mb-5 mt-5"/>
      <VariantContentList :id="$route.params.id"/>
    </v-container>
  </template>
  
  <script>
  import EditVariantComponent from "../../../components/variant/EditVariantComponent";
  import VariantContentList from "../../../components/variant/VariantContentList";
  export default {
    name: "EditVariantPage",
    components: {
      VariantContentList, EditVariantComponent
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
  