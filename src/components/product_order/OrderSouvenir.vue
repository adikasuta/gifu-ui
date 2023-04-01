<template>
  <div>
    <v-row>
      <v-col md="4" cols="12"> </v-col>
      <v-col md="8" cols="12"> </v-col>
    </v-row>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <v-dialog
      v-model="isError"
      persistent
      :width="$vuetify.breakpoint.xsOnly ? '100%' : '25%'"
    >
      <ErrorDialog
        :errorDescription="errorMessage"
        @close:dialog="isError = !isError"
      />
    </v-dialog>
  </div>
</template>

<script>
import ErrorDialog from "../dialogs/ErrorDialog.vue";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import { mapState } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useOrderProductForm } from "../../store/order-form";
export default {
  name: "OrderSouvenir",
  components: { ErrorDialog, LoadingDialog },
  data() {
    return {
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  async created() {
    
  },
  computed: {
    ...mapState(useReferenceData, ["publicCategories"]),
    ...mapState(useOrderProductForm, ["publicCategories", "productTypes"]),
  },
  methods: {
    // async handleRefresh() {
    //   try {
    //     this.isLoading = true;

    //     this.isLoading = false;
    //   } catch (error) {
    //     this.isLoading = false;
    //     this.isError = true;
    //     this.errorMessage = "Unhandled Error";
    //     if (error.response) {
    //       this.errorMessage = error.response.data.message;
    //     }
    //   }
    // },
  },
};
</script>

<style scoped></style>
