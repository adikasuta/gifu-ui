<template>
  <div>
    <ValidationObserver ref="observer">
      <BasicForm>
        <template v-slot:header>
          {{
            contentCategory.id
              ? $t("views.workflow.updateCategory")
              : $t("views.workflow.addNewCategory")
          }}
        </template>
        <template v-slot:body>
          <v-container>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Product Type"
                  rules="required"
                  ref="provider"
                >
                  <v-select
                    :items="productTypes"
                    :label="$t('views.workflow.fields.productType')"
                    outlined
                    v-model="contentCategory.productType"
                    :error-messages="errors"
                  >
                  </v-select>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Category Name"
                  rules="required"
                  ref="provider"
                >
                  <v-text-field
                    :label="$t('views.workflow.fields.categoryName')"
                    outlined
                    v-model="contentCategory.name"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Design Estimation"
                  rules="required"
                  ref="provider"
                >
                  <v-text-field
                    :label="$t('views.workflow.fields.designEstimation')"
                    outlined
                    v-mask="'##'"
                    v-model="contentCategory.designEstimation"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Product Estimation"
                  rules="required"
                  ref="provider"
                >
                  <v-text-field
                    :label="$t('views.workflow.fields.productionEstimation')"
                    outlined
                    v-mask="'##'"
                    v-model="contentCategory.productionEstimation"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-slot:footer>
          <v-btn elevation="2" color="primary" @click="handleSave">
            {{ $t("views.workflow.save") }}</v-btn
          >
          <v-btn elevation="2" color="primary" @click="hideDialog" class="mr-5">
            {{ $t("views.workflow.back") }}</v-btn
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
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import BasicForm from "../layout/BasicForm";
import ErrorDialog from "../dialogs/ErrorDialog.vue";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import CategoryService from "../../services/Category.service";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
export default {
  name: "AddNewCategory",
  components: {
    LoadingDialog,
    ErrorDialog,
    BasicForm,
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    category: {},
  },
  data() {
    return {
      contentCategory: this.category,
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapState(useReferenceData, ["productTypes"]),
  },
  methods: {
    ...mapActions(useReferenceData, ["loadReferenceData"]),
    async handleSave() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          try {
            this.isLoading = true;
            if (this.contentCategory.id) {
              await CategoryService.putProductCategory(this.contentCategory);
            } else {
              await CategoryService.postProductCategory(this.contentCategory);
            }
            this.isLoading = false;
            this.loadReferenceData();
            this.$emit("close:dialog");
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
      this.contentCategory = {};
    },
  },
};
</script>
