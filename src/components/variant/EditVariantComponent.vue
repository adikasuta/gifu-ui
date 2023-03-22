<template>
  <div>
    <BasicForm>
      <template v-slot:header>
        {{ isCreate ? $t("views.variant.add") : $t("views.variant.edit") }}
      </template>
      <template v-slot:body>
        <v-row>
          <v-col cols="12">
            <v-text-field
              :label="$t('views.variant.fields.name')"
              outlined
              v-model="variant.name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              :items="variantTypes"
              :label="$t('views.variant.fields.variantTypeCode')"
              outlined
              v-model="variant.variantTypeCode"
            >
            </v-select>
          </v-col>
        </v-row>
      </template>
      <template v-slot:footer>
        <v-btn elevation="2" color="primary" @click="handleSave">
          {{ $t("views.variant.submit") }}</v-btn
        >
      </template>
    </BasicForm>
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
import ErrorDialog from "../dialogs/ErrorDialog.vue";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import BasicForm from "../layout/BasicForm";
import VariantService from "../../services/Variant.service";
import { mapState } from "pinia";
import { useReferenceData } from "../../store/reference-data";
export default {
  props: ["id"],
  components: {
    BasicForm,
    ErrorDialog,
    LoadingDialog,
  },
  data() {
    return {
      variant: {},
      isLoading: false,
      isError: false,
      errorMessage: "",
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
    initVariant() {
      this.variant = {
        id: null,
        name: "",
        variantTypeCode: "",
        allowedToBeSecondary: false,
      };
    },
    async handleSave() {
      try {
        this.isLoading = true;
        await VariantService.postVariant(this.variant);
        this.isLoading = false;
        if(this.isCreate){
          this.$router.push(`/dashboard/variant`);
        }
      } catch (error) {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Unhandled Error";
        if (error.response) {
          this.errorMessage = error.response.data.message;
        }
      }
    },
    async handleRefresh() {
      try {
        this.isLoading = true;
        this.variant = await VariantService.getVariantById(this.id);
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
