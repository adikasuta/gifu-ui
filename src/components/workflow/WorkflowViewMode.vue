<template>
  <v-card>
    <v-card-title
      ><v-text-field
        solo
        v-model="name"
        :label="$t('views.workflow.fields.workflowName')"
        append-icon="mdi-pencil"
        @change="handleChangeName"
      ></v-text-field
    ></v-card-title>
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
</template>

<script>
import StringUtils from '../../utils/StringUtils';
import WorkflowService from '../../services/Workflow.service';
export default {
  name: "WorkflowViewMode",
  props: ["workflow"],
  data() {
    return {
      name: this.workflow.name,
    };
  },
  methods: {
    ...StringUtils,
    async handleChangeName(e) {
        await WorkflowService.changeName({
          workflowId: this.workflow.id,
          workflowName: e
        })
    },
    handleEdit() {
      this.$emit("on:edit");
    },
    async handleDelete() {
      await WorkflowService.deleteWorkflows(this.workflow.id);
      this.$emit("on:refresh");
    },
  },
};
</script>

<style scoped></style>
