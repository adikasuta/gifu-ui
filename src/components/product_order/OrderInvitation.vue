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
                dark
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
              <ValidationObserver ref="designObserver">
                <SelectProductDesign />
              </ValidationObserver>

              <v-divider class="mt-10 mb-5"></v-divider>
              <v-btn
                color="pink lighten-1"
                dark
                @click="validateAndNext('designObserver', 2)"
              >
                {{ $t("views.order.next") }}
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <ValidationObserver ref="detailProductObserver">
                <CompleteDetailProduct />
              </ValidationObserver>

              <v-divider class="mt-10 mb-5"></v-divider>
              <v-btn text @click="e1 = 1"> {{ $t("views.order.back") }} </v-btn>
              <v-btn
                color="pink lighten-1"
                dark
                @click="validateAndNext('detailProductObserver', 3)"
              >
                {{ $t("views.order.next") }}
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <ValidationObserver ref="additionalRequestObserver">
                <AdditionalRequest />
              </ValidationObserver>
              <v-divider class="mt-10 mb-5"></v-divider>

              <v-btn text @click="e1 = 2"> {{ $t("views.order.back") }} </v-btn>
              <v-btn
                color="pink lighten-1"
                dark
                @click="validateAndNext('additionalRequestObserver', 4)"
              >
                {{ $t("views.order.next") }}
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <ValidationObserver ref="customerDataObserver">
                <CustomerData />
              </ValidationObserver>
              <v-divider class="mt-10 mb-5"></v-divider>
              <v-btn text @click="e1 = 3"> {{ $t("views.order.back") }} </v-btn>
              <v-btn
                color="pink lighten-1"
                dark
                @click="handleOrder('customerDataObserver')"
              >
                {{ $t("views.order.order") }}
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <ConfirmationDialog ref="confirmationDialog" />
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import CustomerData from "./invitation/CustomerData";
import AdditionalRequest from "./invitation/AdditionalRequest";
import SelectProductDesign from "./invitation/SelectProductDesign";
import CompleteDetailProduct from "./invitation/CompleteDetailProduct";
import ProductOverview from "./ProductOverview";
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import { mapState, mapWritableState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useOrderProductForm } from "../../store/order-form";
import { useErrorMessage } from "../../store/error-message";
export default {
  name: "OrderInvitation",
  components: {
    ValidationObserver,
    CustomerData,
    AdditionalRequest,
    CompleteDetailProduct,
    SelectProductDesign,
    LoadingDialog,
    ProductOverview,
    ConfirmationDialog,
  },
  data() {
    return {
      e1: 1,
      isLoading: false,
      stepTitles: [
        "views.order.invitation.steps.design",
        "views.order.invitation.steps.detail",
        "views.order.invitation.steps.additional",
        "views.order.invitation.steps.customerData",
      ],
    };
  },
  async created() {},
  computed: {
    ...mapWritableState(useOrderProductForm, ["customerInfoForm"]),
    ...mapState(useReferenceData, ["publicCategories"]),
    ...mapState(useOrderProductForm, ["publicCategories", "productTypes"]),
  },
  methods: {
    ...mapActions(useOrderProductForm, ["postInvitationOrder"]),
    ...mapActions(useErrorMessage, ["pushError"]),
    handleOrder(validator) {
      this.$refs[validator].validate().then(async (success) => {
        if (success) {
          const yes = await this.$refs.confirmationDialog.showDialog(
            "views.order.confirmation"
          );
          if (yes) {
            try {
              this.isLoading = true;
              const order = await this.postInvitationOrder();
              this.isLoading = false;
              this.$router.push(`/order/${order.orderCode}/invoice`);
            } catch (error) {
              console.log(error);
              this.isLoading = false;
              this.pushError(error);
            }
          }
        }
      });
    },
    validateAndNext(validator, nextStep) {
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
