<template>
  <v-card color="#FCE4EC">
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3" size="125" tile>
        <ImageComponent :filename="cartItem.productImage" />
      </v-avatar>
      <div style="width: 100%;">
        <v-card-title class="justify-space-between" style="display: flex; width:100%;"> 
            <h3 class="">
                {{ `${cartItem.productType} - ${cartItem.productName}` }}
            </h3>
            <h3>{{$t("views.cart.grandTotal")}} - {{ cartItem.grandTotal | toCurrency }}</h3>
            
        </v-card-title>

        <v-card-subtitle>
          {{ (cartItem.variantPrice + cartItem.productPrice) | toCurrency }}/pcs
          <br />
          {{ `${cartItem.quantity} pcs` }}
        </v-card-subtitle>

        <v-card-actions>
          <v-btn @click="handleRemove" class="ml-2 mt-3" height="40px" right>
            {{ $t("views.cart.remove") }}
          </v-btn>
          <v-btn
            @click="handleSeeInvoice"
            class="ml-2 mt-3"
            height="40px"
            right
          >
            {{ $t("views.cart.seeInvoice") }}
          </v-btn>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script>
import ImageComponent from "../common/ImageComponent";
export default {
  components: { ImageComponent },
  props: ["cartItem", "index"],
  data() {
    return {};
  },
  async created() {},
  computed: {},
  methods: {
    handleRemove() {
      this.$emit("on:remove", this.cartItem.orderCode);
    },
    handleSeeInvoice() {
      this.$router.push(`/order/${this.cartItem.orderCode}/invoice`);
    },
  },
};
</script>

<style scoped></style>
