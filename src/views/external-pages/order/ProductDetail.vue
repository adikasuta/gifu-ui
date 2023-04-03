<template>
  <div>
    <OrderInvitation v-if="isInvitation" />
    <OrderSouvenir v-if="isSouvenir" />
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </div>
</template>

<script>
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import OrderInvitation from "../../../components/product_order/OrderInvitation";
import OrderSouvenir from "../../../components/product_order/OrderSouvenir";
import { mapState, mapActions } from "pinia";
import { useOrderProductForm } from "../../../store/order-form";
import { useErrorMessage } from "../../../store/error-message";
const SOUVENIR = "SOUVENIR";
const INVITATION = "INVITATION";
export default {
  name: "SouvenirComponent",
  components: { OrderInvitation, OrderSouvenir, LoadingDialog },
  data() {
    return {
      isLoading: false,
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useOrderProductForm, ["productType"]),
    isSouvenir() {
      return this.productType == SOUVENIR;
    },
    isInvitation() {
      return this.productType == INVITATION;
    },
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    ...mapActions(useOrderProductForm, ["loadProductForm"]),
    async handleRefresh() {
      try {
        this.isLoading = true;
        await this.loadProductForm(this.$route.params.id);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.pushError(error);
      }
    },
  },
};
</script>

<style scoped></style>
