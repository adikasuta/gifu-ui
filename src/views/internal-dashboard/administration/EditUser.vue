<template>
    <v-container>
      <slot name="breadcrumb"></slot>
      <EditUser title="views.administration.editAccount" :userId="$route.params.id"/>
      <EditUserPermissions :userId="$route.params.id"/>
    </v-container>
  </template>
  
  <script>
  import EditUser from "../../../components/user/EditUser";
  import EditUserPermissions from "../../../components/user/EditUserPermissions";
  export default {
    components: {
      EditUser,
      EditUserPermissions,
    },
    data() {
      return {
        editUserReady: false,
        editPermissionReady: false,
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
  