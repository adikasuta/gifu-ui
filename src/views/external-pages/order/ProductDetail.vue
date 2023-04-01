<template>
  <div>
    <OrderInvitation v-if="isInvitation"/>
    <OrderSouvenir v-if="isSouvenir" />
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
import ErrorDialog from "../../../components/dialogs/ErrorDialog.vue";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import OrderInvitation from "../../../components/product_order/OrderInvitation";
import OrderSouvenir from "../../../components/product_order/OrderSouvenir";
import { mapState, mapActions } from "pinia";
import { useOrderProductForm } from "../../../store/order-form";
const SOUVENIR = 'SOUVENIR';
const INVITATION = 'INVITATION';
export default {
  name: "SouvenirComponent",
  components: { OrderInvitation, OrderSouvenir, ErrorDialog, LoadingDialog },
  data() {
    return {
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useOrderProductForm, ["productType"]),
    isSouvenir(){
        return this.productType == SOUVENIR;
    },
    isInvitation(){
        return this.productType == INVITATION;
    }
  },
  methods: {
    ...mapActions(useOrderProductForm, ["loadProductForm"]),
    async handleRefresh() {
      try {
        this.isLoading = true;
        await this.loadProductForm(this.$route.params.id);
        this.isLoading = false;
      } catch (error) {
        console.log(error)
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Unhandled Error";
        if (error.response) {
          this.errorMessage = error.response.data.message;
        }
      }
    },
  },
};
</script>

<style scoped></style>
