<template>
  <div>
    <ValidationObserver ref="observer">
      <BasicForm>
        <template v-slot:header>
          {{ $t("views.dashboard.confirmOrder") }}
        </template>
        <template v-slot:body>
          <v-row>
            <v-col cols="6">
              <span
                >{{ $t("views.dashboard.fields.orderCode") }}:
                {{ requestInput.orderCode }}</span
              >
            </v-col>
            <v-col cols="6">
              <span
                >{{ $t("views.dashboard.fields.province") }}:
                {{ requestInput.provinceName }}</span
              >
            </v-col>
            <v-col cols="6">
              <span
                >{{ $t("views.dashboard.fields.city") }}:
                {{ requestInput.cityName }}</span
              >
            </v-col>
            <v-col cols="6">
              <span
                >{{ $t("views.dashboard.fields.district") }}:
                {{ requestInput.districtName }}</span
              >
            </v-col>
            <v-col cols="6">
              <span
                >{{ $t("views.dashboard.fields.kelurahan") }}:
                {{ requestInput.kelurahanName }}</span
              >
            </v-col>
            <v-col cols="6">
              <span
                >{{ $t("views.dashboard.fields.postalCode") }}:
                {{ requestInput.postalCode }}</span
              >
            </v-col>

            <v-col cols="6">
              <span
                >{{ $t("views.dashboard.fields.shippingVendor") }}:
                {{ requestInput.shippingVendorName }}</span
              >
            </v-col>
          </v-row>
          <v-divider class="mt-10 mb-5"></v-divider>
          <v-row>
            <v-col cols="3">
              <span>{{ $t("views.dashboard.fields.deadline") }}</span>
            </v-col>
            <v-col cols="9">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.dashboard.fields.deadline')"
                vid="deadline"
                rules="required"
              >
                <DateComponent
                  v-model="deadline"
                  :label="$t('views.dashboard.fields.deadline')"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <span>{{ $t("views.dashboard.fields.shippingFee") }}</span>
            </v-col>
            <v-col cols="9">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.dashboard.fields.shippingFee')"
                vid="shippingFee"
                rules="required"
              >
                <CurrencyInput
                  v-model="shippingFee"
                  :label="$t('views.dashboard.fields.shippingFee')"
                  :error-messages="errors"
                  :options="currencyOption"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer>
          <v-btn elevation="2" color="primary" @click="confirmOrder">
            {{ $t("views.dashboard.confirm") }}</v-btn
          >
          <v-btn elevation="2" color="primary" @click="hideDialog" class="mr-5">
            {{ $t("views.dashboard.cancel") }}</v-btn
          >
        </template>
      </BasicForm>
    </ValidationObserver>
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
import { ValidationObserver } from "vee-validate";
import ErrorDialog from "../dialogs/ErrorDialog.vue";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import BasicForm from "../layout/BasicForm";
import CurrencyInput from "../common/CurrencyInput";
import DateComponent from "../common/DateComponent";
import OrderService from "../../services/Order.service";
import StringUtils from "../../utils/StringUtils";

export default {
  props: ["requestInput"],
  components: {
    BasicForm,
    ValidationProvider,
    CurrencyInput,
    DateComponent,
    ErrorDialog,
    LoadingDialog,
    ValidationObserver,
  },
  data() {
    return {
      currencyOption: StringUtils.currencyOption,
      deadline: null,
      shippingFee: null,
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  created() {
    (this.deadline = null), (this.shippingFee = null);
  },
  methods: {
    async confirmOrder() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          try {
            this.isLoading = true;
            await OrderService.confirmOrder({
              orderId: this.requestInput.orderId,
              shippingFee: this.shippingFee,
              deadline: this.deadline,
            });
            this.isLoading = false;
            this.$emit("on:success");
            this.hideDialog();
            this.contentCategory = {};
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
    hideDialog() {
      this.$emit("close:dialog");
    },
  },
};
</script>
