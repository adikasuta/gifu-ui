<template>
  <v-container>
    <slot name="breadcrumb"></slot>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.profile.title") }}
      </template>
      <template v-slot:body>
        <ValidationObserver ref="observer">
          <v-row>
            <v-col cols="4">
              <span>{{ $t("views.profile.fields.picture") }}</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                :name="`Profile Image`"
                rules="file_size"
                ref="provider"
              >
                <v-file-input
                  v-model="pictureFile"
                  accept="image/*"
                  outlined
                  :error-messages="errors"
                  :label="$t('views.profile.fields.picture')"
                  @change="previewImage"
                ></v-file-input>
              </ValidationProvider>
              <ImageComponent
                :filename="pictureShow"
                :isPreview="isPreview"
                maxWidth="200"
              ></ImageComponent>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <span>{{ $t("views.profile.fields.name") }}</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.profile.fields.name')"
                vid="name"
                rules="required"
                ref="provider"
              >
                <v-text-field
                  outlined
                  v-model="profile.name"
                  :error-messages="errors"
                  :label="$t('views.profile.fields.name')"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <span>{{ $t("views.profile.fields.gender") }}</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.profile.fields.gender')"
                vid="gender"
                rules="required"
                ref="provider"
              >
                <v-select
                  v-model="profile.gender"
                  :items="genders"
                  :error-messages="errors"
                  :label="$t('views.profile.fields.gender')"
                  outlined
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <span>{{ $t("views.profile.fields.birthDate") }}</span>
            </v-col>
            <v-col cols="8">
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <ValidationProvider
                    v-slot="{ errors }"
                    :name="$t('views.profile.fields.birthDate')"
                    vid="birthDate"
                    :rules="{
                      required: true,
                    }"
                  >
                    <v-text-field
                      v-model="profile.birthDate"
                      :label="$t('views.profile.fields.birthDate')"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </template>
                <v-date-picker
                  color="pink lighten-1"
                  v-model="profile.birthDate"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <span>{{ $t("views.profile.fields.phoneNo") }}</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.profile.fields.phoneNo')"
                vid="phoneNo"
                rules="required"
                ref="provider"
              >
                <v-text-field
                  outlined
                  v-model="profile.phoneNo"
                  :error-messages="errors"
                  :label="$t('views.profile.fields.phoneNo')"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <span>{{ $t("views.profile.fields.address") }}</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('views.profile.fields.address')"
                vid="address"
                rules="required"
                ref="provider"
              >
                <v-textarea
                  :error-messages="errors"
                  v-model="profile.address"
                  :label="$t('views.profile.fields.address')"
                  outlined
                  rows="5"
                  max-height="200"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <span>{{ $t("views.profile.fields.referralToken") }}</span>
            </v-col>
            <v-col cols="8">
              <v-text-field
                outlined
                readonly
                v-model="profile.referralToken"
                :label="$t('views.profile.fields.referralToken')"
              >
                <template v-slot:append-outer>
                  <v-btn
                    elevation="2"
                    style="height: 56px; margin: -20px 0 0 0"
                    @click="handleRegenerateCode"
                  >
                    {{ $t("views.profile.generateCode") }}</v-btn
                  >
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <v-btn elevation="2"  @click="handleSubmit">
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
import ImageComponent from "../../../components/common/ImageComponent";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import BasicForm from "../../../components/layout/BasicForm";
import UserService from "../../../services/User.service";
import { mapActions, mapState } from "pinia";
import { useErrorMessage } from "../../../store/error-message";
import { useReferenceData } from "../../../store/reference-data";
export default {
  components: {
    BasicForm,
    LoadingDialog,
    ValidationObserver,
    ValidationProvider,
    ImageComponent,
  },
  data() {
    return {
      previewUrl: null,
      pictureFile: null,
      profile: {},
      dateMenu: false,
      isLoading: false,
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useReferenceData, ["genders"]),
    
    isPreview() {
      return !!this.previewUrl;
    },
    pictureShow() {
      if (this.isPreview) {
        return this.previewUrl;
      }
      return this.profile.picture;
    },
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),

    previewImage() {
      this.previewUrl = URL.createObjectURL(this.pictureFile);
    },
    async handleRegenerateCode() {
      try {
        this.isLoading = true;
        await UserService.generateProfileReferralCode();
        await this.handleRefresh();
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
    async handleSubmit() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          try {
            this.isLoading = true;
            const formData = new FormData();
            formData.set("file", this.pictureFile);
            formData.set("payload", JSON.stringify(this.profile));
            await UserService.updateProfile(formData);
            await this.handleRefresh();
            this.isLoading = false;
          } catch (error) {
            console.log(error);
            this.isLoading = false;
            this.pushError(error);
          }
        }
      });
    },
    async handleRefresh() {
      try {
        this.isLoading = true;
        this.profile = await UserService.getProfile();
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
  },
};
</script>
