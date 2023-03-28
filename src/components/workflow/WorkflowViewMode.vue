<template>
  <div>
    <v-card>
      <v-card-title>
        {{ name }}
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="10">
            {{ getNames(workflow.productCategories, ", ") }}
          </v-col>
          <v-col cols="2">
            <v-btn elevation="2" small @click="handleEdit">{{
              $t("views.workflow.edit")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="10"> {{ getNames(workflow.steps, " - ") }} </v-col>
          <v-col cols="2">
            <v-btn elevation="2" small @click="handleDelete">{{
              $t("views.workflow.remove")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <v-dialog v-model="isError" width="25%" persistent>
      <ErrorDialog
        :errorDescription="errorMessage"
        @close:dialog="isError = !isError"
      />
    </v-dialog>
    <ConfirmationDialog ref="confirmationDialog" />
  </div>
</template>

<script>
import ErrorDialog from "../dialogs/ErrorDialog.vue";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import StringUtils from "../../utils/StringUtils";
import WorkflowService from "../../services/Workflow.service";
export default {
  name: "WorkflowViewMode",
  props: ["workflow"],
  components: {
    ErrorDialog,
    ConfirmationDialog,
    LoadingDialog,
  },
  data() {
    return {
      name: this.workflow.name,
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  methods: {
    ...StringUtils,
    async handleChangeName(e) {
      try {
        this.isLoading = true;
        await WorkflowService.changeName({
          workflowId: this.workflow.id,
          workflowName: e,
        });
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
    handleEdit() {
      this.$emit("on:edit");
    },
    async handleDelete() {
      const yes = await this.$refs.confirmationDialog.showDialog(
        "views.workflow.confirmations.removeWorkflow"
      );
      if (yes) {
        try {
          this.isLoading = true;
          await WorkflowService.deleteWorkflows(this.workflow.id);
          this.$emit("on:refresh");
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = "Unhandled Error";
          if (error.response) {
            this.errorMessage = error.response.data.message;
          }
        }
      }
    },
  },
};
</script>

<style scoped></style>
