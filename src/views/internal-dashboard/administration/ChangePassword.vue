<template>
  <v-container>
    <slot name="breadcrumb"></slot>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.profile.changePassword") }}
      </template>
      <template v-slot:body>
        <ValidationObserver ref="observer">
          <v-row>
            <v-col cols="4">
              <span>{{ $t("views.profile.fields.oldPassword") }}</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.profile.fields.oldPassword')"
                vid="oldPassword"
                rules="required"
                ref="provider"
              >
                <v-text-field
                  outlined
                  type="password"
                  v-model="oldPassword"
                  :error-messages="errors"
                  :label="$t('views.profile.fields.oldPassword')"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <span>{{ $t("views.profile.fields.newPassword") }}</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.profile.fields.newPassword')"
                vid="newPassword"
                rules="required"
                ref="provider"
              >
                <v-text-field
                  outlined
                  type="password"
                  v-model="newPassword"
                  :error-messages="errors"
                  :label="$t('views.profile.fields.newPassword')"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <span>{{ $t("views.profile.fields.confirmNewPassword") }}</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.profile.fields.confirmNewPassword')"
                vid="confirmNewPassword"
                :rules="{
                  required: true,
                  confirmPassword: newPassword,
                }"
                ref="provider"
              >
                <v-text-field
                  outlined
                  type="password"
                  v-model="confirmNewPassword"
                  :error-messages="errors"
                  :label="$t('views.profile.fields.confirmNewPassword')"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <v-btn elevation="2" @click="handleSubmit">
          {{ $t("views.profile.save") }}</v-btn
        >
      </template>
    </BasicForm>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </v-container>
</template>

<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import { ValidationObserver } from "vee-validate";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import BasicForm from "../../../components/layout/BasicForm";
import AuthService from "../../../services/Auth.service";
import SessionUtils from "../../../utils/SessionUtils";
import { mapActions } from "pinia";
import { useErrorMessage } from "../../../store/error-message";
export default {
  components: {
    BasicForm,
    LoadingDialog,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      oldPassword: null,
      newPassword: null,
      confirmNewPassword: null,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    async handleSubmit() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          try {
            this.isLoading = true;
            await AuthService.changePassword({
              newPassword: this.newPassword,
              oldPassword: this.oldPassword,
            });
            SessionUtils.clearCookie();
            this.$router.push("/login");
            this.isLoading = false;
          } catch (error) {
            console.log(error);
            this.isLoading = false;
            this.pushError(error);
          }
        }
      });
    },
  },
};
</script>
