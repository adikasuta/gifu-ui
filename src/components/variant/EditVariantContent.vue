<template>
  <div>
    <ValidationObserver ref="observer">
      <BasicForm>
        <template v-slot:header>
          {{
            isCreate
              ? $t("views.variant.addContent")
              : $t("views.variant.editContent")
          }}
        </template>
        <template v-slot:body>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="Content Name"
                rules="required"
                ref="provider"
              >
                <v-text-field
                  :label="$t('views.variant.fields.name')"
                  outlined
                  :error-messages="errors"
                  v-model="contentForm.name"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="Content Image"
                rules="file_size"
                ref="provider"
              >
                <v-file-input
                  v-model="file"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an image"
                  label="Image"
                  :error-messages="errors"
                ></v-file-input>
              </ValidationProvider>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer>
          <v-btn elevation="2" color="primary" @click="handleSave">
            {{ $t("views.variant.submit") }}</v-btn
          >
          <v-btn elevation="2" color="primary" @click="hideDialog" class="mr-5">
            {{ $t("views.variant.back") }}</v-btn
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
import { mapActions } from "pinia";
import { useErrorMessage } from "../../store/error-message";
export default {
  props: ["content", "variantId"],
  components: {
    BasicForm,
    LoadingDialog,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      contentForm: this.content,
      isLoading: false,
      file: null,
      formData: new FormData(),
    };
  },
  computed:{
    isCreate(){
      return !this.contentForm.id
    }
  },
  async created() {
    this.contentForm = this.content;
    this.formData = new FormData();
    this.file = null;
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    hideDialog() {
      this.$emit("close:dialog");
      this.contentForm = {};
      this.file = null;
    },
    async handleSave() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          try {
            this.isLoading = true;
            this.formData.set("file", this.file);
            this.formData.set("payload", JSON.stringify(this.contentForm));
            await VariantService.postContent(this.variantId, this.formData);

            this.$emit("on:refresh");
            this.hideDialog();
            this.isLoading = false;
          } catch (error) {
            this.isLoading = false;
            this.pushError(error);
          }
        }
      });
    },
  },
};
</script>
