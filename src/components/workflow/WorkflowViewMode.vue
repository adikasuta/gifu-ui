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
            <v-btn elevation="2" v-if="hasPermission('workflow_edit')" small @click="handleEdit">{{
              $t("views.workflow.edit")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="10"> {{ getNames(workflow.steps, " - ") }} </v-col>
          <v-col cols="2">
            <v-btn elevation="2" v-if="hasPermission('workflow_delete')" small @click="handleDelete">{{
              $t("views.workflow.remove")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <ConfirmationDialog ref="confirmationDialog" />
  </div>
</template>

<script>
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import StringUtils from "../../utils/StringUtils";
import SessionUtils from "../../utils/SessionUtils";
import WorkflowService from "../../services/Workflow.service";
import { mapActions } from "pinia";
import { useErrorMessage } from "../../store/error-message";
export default {
  name: "WorkflowViewMode",
  props: ["workflow"],
  components: {
    ConfirmationDialog,
    LoadingDialog,
  },
  data() {
    return {
      name: this.workflow.name,
      isLoading: false,
    };
  },
  methods: {
    ...SessionUtils,
    ...mapActions(useErrorMessage, ["pushError"]),
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
        this.pushError(error);
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
          this.pushError(error);
        }
      }
    },
  },
};
</script>

<style scoped></style>
