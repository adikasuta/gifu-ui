<template>
  <div>
    <v-container>
      <CartItem
        class="mb-5"
        v-for="(item, index) of getCartItems"
        :cartItem="item"
        :index="index"
        :key="index"
      />
    </v-container>
    <v-container v-if="getCartItems.length <= 0">
      <h3>{{ $t("views.cart.noCartItems") }}</h3>
    </v-container>
    <v-divider class="mt-10 mb-10" />
    <v-row>
      <v-col cols="12" class="text-right">
        <h3 class="mr-10 mb-10">
          Total ({{ getCartItems.length }} items):
          {{ totalPayment | toCurrency }}
        </h3>
      </v-col>
    </v-row>
    <v-row v-if="getCartItems.length > 0">
      <v-col cols="3">
        <h3 class="text-right">{{ $t("views.cart.paymentTerm") }}</h3>
      </v-col>
      <v-col cols="3">
        <ValidationObserver ref="observer">
          <ValidationProvider
            v-slot="{ errors }"
            :name="`Payment Term`"
            rules="required"
          >
            <v-radio-group
              v-model="paymentTerm"
              column
              :error-messages="errors"
            >
              <v-radio :label="$t('views.cart.cash')" value="CASH"></v-radio>
              <v-radio
                :label="$t('views.cart.downpayment')"
                value="DOWN_PAYMENT"
              ></v-radio>
            </v-radio-group>
          </ValidationProvider>
        </ValidationObserver>
      </v-col>
      <v-col cols="6">
        <ul>
          <li v-for="(item, index) of payments" :key="index">
            {{ `${$t("views.cart.downpaymentke")} ${index + 1}: ` }}
            {{ item | toCurrency }}
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between">
        <v-btn
          link
          href="#/products"
          class="ml-10 mb-10"
          color="pink lighten-1"
          height="40px"
        >
          {{ $t("views.cart.shopping") }}
        </v-btn>
        <v-btn
          v-if="getCartItems.length > 0"
          @click="handleCheckout"
          class="mr-10 mb-10"
          color="pink lighten-1"
          height="40px"
        >
          {{ $t("views.cart.checkout") }}
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <v-dialog v-model="isError" width="25%" persistent>
      <ErrorDialog
        :errorDescription="errorMessage"
        @close:dialog="isError = !isError"
      />
    </v-dialog>
  </div>
</template>

<script>

// TODO: DELETE METHOD
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import ErrorDialog from "../../../components/dialogs/ErrorDialog.vue";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import CartItem from "../../../components/product/CartItem";
import { mapState, mapActions, mapWritableState } from "pinia";
import { useCartData } from "../../../store/cart-data";
export default {
  components: {
    ErrorDialog,
    LoadingDialog,
    CartItem,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  async created() {
    await this.onrefresh();
  },
  computed: {
    ...mapWritableState(useCartData, ["paymentTerm"]),
    ...mapState(useCartData, ["getCartItems"]),
    totalPayment() {
      let total = 0;
      for (const item of this.getCartItems) {
        total += item.grandTotal;
      }
      return total;
    },
    payments() {
      let payment = [];
      if (this.paymentTerm == "CASH") {
        payment = [this.totalPayment];
      } else if (this.paymentTerm == "DOWN_PAYMENT") {
        payment = [
          this.totalPayment * 0.5,
          this.totalPayment * 0.3,
          this.totalPayment * 0.2,
        ];
      }

      return payment;
    },
  },
  methods: {
    ...mapActions(useCartData, ["loadCartItems", "checkout"]),
    async handleCheckout() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          try {
            this.isLoading = true;
            await this.checkout();
            this.isLoading = false;
            this.$router.push("/checkout");
          } catch (error) {
            this.isLoading = false;
            this.isError = true;
            this.errorMessage = "Unhandled Error";
            if (error.response) {
              this.errorMessage = error.response.data.message;
            }
          }
        }
      });
    },
    async onrefresh() {
      try {
        this.isLoading = true;
        await this.loadCartItems();
        this.isLoading = false;
      } catch (error) {
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
