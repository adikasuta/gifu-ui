<template>
  <div>
    <v-row>
      <v-col md="4" cols="12">
        <ProductOverview />
      </v-col>
      <v-col md="8" cols="12">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <template v-for="(step, index) in stepTitles">
              <v-stepper-step
                :key="`step-${index}`"
                :complete="e1 > index"
                :step="index + 1"
                color="pink lighten-1"
              >
                {{ $t(step) }}
              </v-stepper-step>

              <v-divider
                v-if="index !== stepTitles.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <ValidationObserver ref="detailProductObserver">
                <CompleteDetailProduct />
              </ValidationObserver>

              <v-divider class="mt-10 mb-5"></v-divider>
              <v-btn
                color="pink lighten-1"
                @click="validateAndNext('detailProductObserver', 2)"
              >
                {{ $t("views.order.next") }}
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <ValidationObserver ref="additionalRequestObserver">
                <AdditionalRequest />
              </ValidationObserver>
              <v-divider class="mt-10 mb-5"></v-divider>

              <v-btn text @click="e1 = 1"> {{ $t("views.order.back") }} </v-btn>
              <v-btn
                color="pink lighten-1"
                @click="validateAndNext('additionalRequestObserver', 3)"
              >
                {{ $t("views.order.next") }}
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <ValidationObserver ref="customerDataObserver">
                <CustomerData />
              </ValidationObserver>
              <v-divider class="mt-10 mb-5"></v-divider>
              <v-btn text @click="e1 = 2"> {{ $t("views.order.back") }} </v-btn>
              <v-btn
                color="pink lighten-1"
                @click="handleOrder('customerDataObserver')"
              >
                {{ $t("views.order.order") }}
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
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
import { ValidationObserver } from "vee-validate";
import CustomerData from "./souvenir/CustomerData";
import AdditionalRequest from "./souvenir/AdditionalRequest";
import CompleteDetailProduct from "./souvenir/CompleteDetailProduct";
import ProductOverview from "./ProductOverview";
import ErrorDialog from "../dialogs/ErrorDialog.vue";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import { mapState, mapWritableState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useOrderProductForm } from "../../store/order-form";
import SessionUtils from "../../utils/SessionUtils";
export default {
  name: "OrderSouvenir",
  components: {
    ValidationObserver,
    CustomerData,
    AdditionalRequest,
    CompleteDetailProduct,
    ErrorDialog,
    LoadingDialog,
    ProductOverview,
  },
  data() {
    return {
      e1: 1,
      isLoading: false,
      isError: false,
      errorMessage: "",
      stepTitles: [
        "views.order.souvenir.steps.detail",
        "views.order.souvenir.steps.additional",
        "views.order.souvenir.steps.customerData",
      ],
    };
  },
  async created() {},
  computed: {
    ...mapWritableState(useOrderProductForm, ["customerInfoForm","SOUVENIR"]),
    ...mapState(useReferenceData, ["publicCategories"]),
    ...mapState(useOrderProductForm, ["publicCategories", "productTypes"]),
  },
  methods: {
    ...mapActions(useOrderProductForm, ["postSouvenirOrder","reset"]),
    handleOrder(validator) {
      this.$refs[validator].validate().then(async (success) => {
        if (success) {
          try {
            this.isLoading = true;
            const order = await this.postSouvenirOrder();
            SessionUtils.putSessionData(
              "client_email",
              this.customerInfoForm.customerEmail,
              24 * 7
            );
            this.isLoading = false;
            this.$router.push(`/order/${order.orderCode}/invoice`);
          } catch (error) {
            console.log(error);
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
    validateAndNext(validator,nextStep) {
      this.$refs[validator].validate().then(async (success) => {
        if (success) {
          this.e1 = nextStep;
        }
      });
    },
  },
};
</script>

<style scoped></style>
