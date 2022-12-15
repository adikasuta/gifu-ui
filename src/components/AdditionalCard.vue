<template>
  <div>
    <v-hover v-slot="{ hover }">
      <div v-if="hover">
        <v-card class="mt-8 py-2 px-3 white--text"
          style="display: inline-block; box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.2); width: 150px; height: 98px; border-radius: 10px; background-image: linear-gradient(to right bottom, #946af8, #bb60e0, #d459c7, #e258af, #e95c99, #f3658a, #f8707c, #f97e71, #fe9267, #fea761, #fabc60, #f1d267);">
          <v-img src="../images/visa-white.png" max-width="30"></v-img>
          <div class="px-1 pt-4 justify-space-between"
            style="font-family: 'Noto Sans Mono', monospace !important; font-size: 7px; letter-spacing: 2px">
            {{ paymentInstrument.panNumber }}
          </div>
          <div class="d-flex  justify-space-between">
            <div class="px-1 pt-2" style="font-size: 7px; font-weight: 600; text-transform: uppercase;">
              {{ paymentInstrument.firstName }} {{ paymentInstrument.lastName }}
            </div>
            <div class="px-2"
              style="font-size: 8px; font-family: 'Noto Sans Mono', monospace !important; padding-top: 6px">
              {{ `${paymentInstrument.expirationMonth}/${paymentInstrument.expirationYear}` }}
            </div>
          </div>
        </v-card>

        <v-card>
          <v-list>
            <v-list-item v-for="(action, index) in creditCardActions" :key="index" @click="action.action">
              <v-list-item-content>
                <v-list-item-title style="font-size: 14px;">
                  {{ action.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </div>

      <div v-else style="width: 150px">
        <v-card class="mt-8 py-2 px-3 white--text"
          style="display: inline-block; width: 150px; height: 98px; border-radius: 10px; background-image: linear-gradient(to right bottom, #946af8, #bb60e0, #d459c7, #e258af, #e95c99, #f3658a, #f8707c, #f97e71, #fe9267, #fea761, #fabc60, #f1d267);">
          <v-img src="../images/visa-white.png" max-width="30"></v-img>
          <div class="px-1 pt-4 justify-space-between"
            style="font-family: 'Noto Sans Mono', monospace !important; font-size: 7px; letter-spacing: 2px">
            {{ paymentInstrument.panNumber }}
          </div>
          <div class="d-flex  justify-space-between">
            <div class="px-1 pt-2" style="font-size: 7px; font-weight: 600; text-transform: uppercase;">
              {{ paymentInstrument.firstName }} {{ paymentInstrument.lastName }}
            </div>
            <div class="px-2"
              style="font-size: 8px; font-family: 'Noto Sans Mono', monospace !important; padding-top: 6px">
              {{ `${paymentInstrument.expirationMonth}/${paymentInstrument.expirationYear}` }}
            </div>
          </div>
        </v-card>
      </div>
    </v-hover>

    <v-dialog v-model="removeCardConfirmationDialog" persistent max-width="450">
      <RemoveCardConfirmationDialog @close:dialog="toggleRemoveCardConfirmationDialog"
        @trigger:remove-card="removeCreditCard" />
    </v-dialog>

    <v-dialog v-model="loadingDialog" width="100" persistent>
      <LoadingDialog />
    </v-dialog>

    <v-dialog v-model="errorDialog" width="450" persistent>
      <ErrorDialog :error-description="errorDescription" @close:dialog="toggleErrorDialog" />
    </v-dialog>

    <v-dialog v-model="successDialog" width="450" persistent>
      <SuccessDialog :success-description="successDescription" @close:dialog="toggleSuccessDialog" />
    </v-dialog>
  </div>
</template>

<script>
import RemoveCardConfirmationDialog from "../components/dialogs/RemoveCardConfirmationDialog.vue";
import LoadingDialog from "../components/dialogs/LoadingDialog.vue";
import ErrorDialog from "../components/dialogs/ErrorDialog.vue";
import SuccessDialog from "../components/dialogs/SuccessDialog.vue";
import CdeBackendService from "../services/CdeBackendService";

export default {
  name: 'AdditionalCard',
  components: {
    RemoveCardConfirmationDialog,
    LoadingDialog,
    ErrorDialog,
    SuccessDialog
  },
  props: {
    paymentInstrument: Object
  },
  data() {
    return {
      removeCardConfirmationDialog: false,
      loadingDialog: false,
      errorDialog: false,
      successDialog: false,
      errorDescription: '',
      successDescription: ''
    }
  },
  computed: {
    creditCardActions() {
      return [
        {
          name: "default",
          title: this.$t('tax_payment.view.make_as_default'),
          action: this.setDefaultCard
        },
        {
          name: "edit",
          title: this.$t('tax_payment.view.edit'),
          action: this.editCardDetails
        },
        {
          name: "remove",
          title: this.$t('tax_payment.view.remove'),
          action: this.removeCard
        }
      ]
    }
  },
  methods: {
    async setDefaultCard() {
      try {
        await CdeBackendService.postAccMgmtSetAsDefault(this.paymentInstrument.accountPaymentInstrumentToken);
        this.$emit("trigger:reload-list");

      } catch (error) {
        this.errorDescription = error.message;
        this.toggleErrorDialog();
      }
    },
    editCardDetails() {
      this.$router.push(`/credit-card/${this.paymentInstrument.accountPaymentInstrumentToken}`)
    },
    removeCard() {
      // BANK-3510
      this.toggleRemoveCardConfirmationDialog();
    },
    toggleRemoveCardConfirmationDialog() {
      this.removeCardConfirmationDialog = !this.removeCardConfirmationDialog;
    },
    toggleLoadingDialog() {
      this.loadingDialog = !this.loadingDialog;
    },
    toggleErrorDialog() {
      this.errorDialog = !this.errorDialog;
      if (!this.errorDialog) this.$emit("trigger:reload-list");
    },
    toggleSuccessDialog() {
      this.successDialog = !this.successDialog;
      if (!this.successDialog) this.$emit("trigger:reload-list");
    },
    async removeCreditCard() {
      try {
        this.toggleRemoveCardConfirmationDialog();
        this.toggleLoadingDialog();
        await CdeBackendService.deleteAccMgmt(this.paymentInstrument.accountPaymentInstrumentToken);
        await CdeBackendService.deleteCdePaymentInstrument(this.paymentInstrument.accountPaymentInstrumentToken);
        this.toggleLoadingDialog();

        this.successDescription = 'Your credit card has been successfully removed';
        this.toggleSuccessDialog();

      } catch (error) {
        this.toggleLoadingDialog();
        this.errorDescription = error.message;
        if (error.response?.data?.message) {
          this.errorDescription = error.response.data.message;
        }
        this.toggleErrorDialog();
      }
    }
  }
}
</script>