<template>
  <div>
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
            <v-text-field
              :label="$t('views.variant.fields.name')"
              outlined
              v-model="contentForm.name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-file-input
              v-model="file"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an image"
              label="Image"
            ></v-file-input>
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
export default {
  props: ["content", "variantId"],
  components: {
    BasicForm,
    ErrorDialog,
    LoadingDialog,
  },
  data() {
    return {
      contentForm: this.content,
      isLoading: false,
      isError: false,
      errorMessage: "",
      file: null,
      formData: new FormData(),
    };
  },
  async created() {
    this.contentForm = this.content;
    this.formData = new FormData();
    this.file = null;
  },
  methods: {
    hideDialog() {
      this.$emit("close:dialog");
      this.contentForm = {};
      this.file = null;
    },
    async handleSave() {
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
