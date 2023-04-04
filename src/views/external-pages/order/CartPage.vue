<template>
  <div>
    <v-container>
      <CartItem
        class="mb-5"
        v-for="(item, index) of getCartItems"
        :cartItem="item"
        :index="index"
        :key="index"
        @on:remove="handleRemoveFromCart"
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
    <div v-if="getCartItems.length > 0">
      <ValidationObserver ref="observer">
        <v-row>
          <v-col cols="3">
            <h3 class="text-right">{{ $t("views.cart.paymentTerm") }}</h3>
          </v-col>
          <v-col cols="3">
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
          <v-col cols="3">
            <h3 class="text-right">
              {{ $t("views.order.fields.payerInformation") }}
            </h3>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-col cols="12" sm="6" class="pb-0">
                <ValidationProvider
                  v-slot="{ errors }"
                  :name="$t('views.order.fields.name')"
                  vid="name"
                  :rules="{
                    required: true,
                  }"
                >
                  <v-text-field
                    outlined
                    v-model="customerName"
                    :error-messages="errors"
                    :label="$t('views.order.fields.name')"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" class="pb-0">
                <ValidationProvider
                  v-slot="{ errors }"
                  :name="$t('views.order.fields.email')"
                  vid="email"
                  :rules="{
                    email: true,
                    required: true,
                  }"
                >
                  <v-text-field
                    outlined
                    v-model="customerEmail"
                    :error-messages="errors"
                    :label="$t('views.order.fields.email')"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" class="pt-0">
                <ValidationProvider
                  v-slot="{ errors }"
                  :name="$t('views.order.fields.phoneNumber')"
                  vid="phoneNumber"
                  :rules="{
                    required: true,
                  }"
                >
                  <v-text-field
                    outlined
                    v-model="phoneNumber"
                    :error-messages="errors"
                    :label="$t('views.order.fields.phoneNumber')"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </ValidationObserver>
    </div>

    <v-row>
      <v-col cols="12" class="d-flex justify-space-between">
        <v-btn
          link
          href="#/products"
          class="ml-10 mb-10"
          color="pink lighten-1"
          dark
          height="40px"
        >
          {{ $t("views.cart.shopping") }}
        </v-btn>
        <v-btn
          v-if="getCartItems.length > 0"
          @click="handleCheckout"
          class="mr-10 mb-10"
          color="pink lighten-1"
          dark
          height="40px"
        >
          {{ $t("views.cart.checkout") }}
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </div>
</template>

<script>
// TODO: DELETE METHOD
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import CartItem from "../../../components/product/CartItem";
import { mapState, mapActions, mapWritableState } from "pinia";
import { useCartData } from "../../../store/cart-data";
import { useErrorMessage } from "../../../store/error-message";
export default {
  components: {
    LoadingDialog,
    CartItem,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  async created() {
    await this.onrefresh();
  },
  computed: {
    ...mapWritableState(useCartData, [
      "paymentTerm",
      "phoneNumber",
      "customerName",
      "customerEmail",
    ]),
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
    ...mapActions(useErrorMessage, ["pushError"]),
    ...mapActions(useCartData, ["loadCartItems", "checkout", "removeFromCart"]),
    async handleRemoveFromCart(orderCode) {
      try {
        this.isLoading = true;
        await this.removeFromCart(orderCode);
        await this.loadCartItems();
        this.isLoading = false;
        this.$router.push("/checkout");
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
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
            this.pushError(error);
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
        this.pushError(error);
      }
    },
  },
};
</script>

<style scoped></style>
