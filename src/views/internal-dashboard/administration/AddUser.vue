<template>
    <v-container>
      <slot name="breadcrumb"></slot>
      <EditUser title="views.administration.addAccount"/>
    </v-container>
  </template>
  
  <script>
  import EditUser from "../../../components/user/EditUser";
  export default {
    components: {
      EditUser
    },
    data() {
      return {
        
      }
    },
    async created() {
      
    },
    computed: {
      
    },
    methods: {
      
    },
  };
  </script>
  