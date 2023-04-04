<template>
  <div>
    <ValidationObserver ref="observer">
      <BasicForm>
        <template v-slot:header>
          {{ isCreate ? $t("views.variant.add") : $t("views.variant.edit") }}
        </template>
        <template v-slot:body>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="variantName"
                rules="required"
                ref="provider"
              >
                <v-text-field
                  :label="$t('views.variant.fields.name')"
                  outlined
                  v-model="variant.name"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="variantType"
                rules="required"
                ref="provider"
              >
                <v-select
                  :items="variantTypes"
                  :label="$t('views.variant.fields.variantTypeCode')"
                  outlined
                  v-model="variant.variantTypeCode"
                  :error-messages="errors"
                >
                </v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer>
          <v-btn elevation="2" small @click="handleSave">
            {{ $t("views.variant.submit") }}</v-btn
          >
        </template>
      </BasicForm>
    </ValidationObserver>

    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import BasicForm from "../layout/BasicForm";
import VariantService from "../../services/Variant.service";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useErrorMessage } from "../../store/error-message";
export default {
  props: ["id"],
  components: {
    BasicForm,
    LoadingDialog,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      variant: {},
      isLoading: false,
    };
  },
  async created() {
    if (!this.isCreate) {
      await this.handleRefresh();
    } else {
      this.initVariant();
    }
  },
  computed: {
    ...mapState(useReferenceData, ["variantTypes"]),
    isCreate() {
      return !this.id;
    },
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    ...mapActions(useReferenceData, ["loadReferenceData"]),
    initVariant() {
      this.variant = {
        id: null,
        name: "",
        variantTypeCode: "",
        allowedToBeSecondary: false,
      };
    },
    async handleSave() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          try {
            this.isLoading = true;
            await VariantService.postVariant(this.variant);
            await this.loadReferenceData();
            this.isLoading = false;
            if (this.isCreate) {
              this.$router.push(`/dashboard/variant`);
            }
          } catch (error) {
            this.isLoading = false;
            this.pushError(error);
          }
        }
      });
    },
    async handleRefresh() {
      try {
        this.isLoading = true;
        this.variant = await VariantService.getVariantById(this.id);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
  },
};
</script>
