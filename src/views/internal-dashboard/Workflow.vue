<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3>{{ $t("views.workflow.title") }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="10" md="8" sm="6">
        <v-text-field
          solo
          v-model="filter.query"
          :label="$t('views.workflow.search')"
          append-icon="mdi-magnify"
          @change="handleRefresh"
        ></v-text-field>
      </v-col>
      <v-col lg="2" md="4" sm="6">
        <TranslatedSelection
          @change="handleRefresh"
          :items="filterItems"
          v-model="filter.fieldName"
        />
      </v-col>
    </v-row>
    <v-row v-for="item of workflowList" :key="item.id">
      <v-col cols="12">
        <WorkflowListItem :workflow="item" @on:refresh="handleRefresh" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn elevation="2" small @click="handleAddWorkflow">{{
          $t("views.workflow.add")
        }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination
          v-model="pagination.pageNumber"
          :length="pagination.totalPages"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import WorkflowService from "../../services/Workflow.service";
import TranslatedSelection from "../../components/common/TranslatedSelection";
import WorkflowListItem from "../../components/workflow/WorkflowListItem";
export default {
  name: "WorkflowComponent",
  components: {
    TranslatedSelection,
    WorkflowListItem,
  },
  data() {
    return {
      filter: {
        query: "",
        fieldName: "",
      },
      filterItems: [
        {
          text: "common.fields.categoryName",
          value: "name",
        },
      ],
      pagination: {
        pageNumber: 1,
        totalPages: 0,
        pageSize: 20,
      },
      workflowList: [],
    };
  },
  async created() {
    await this.loadReferenceData();
    await this.handleRefresh();
  },
  methods: {
    ...mapActions(useReferenceData, ["loadReferenceData"]),
    async handleRefresh() {
      const workflowPage = await WorkflowService.getWorkflows({
        ...this.filter,
        ...this.pagination,
      });
      this.workflowList = workflowPage.content.map((item) => {
        return {
          ...item,
          isView: true,
        };
      });
      this.pagination.totalPages = workflowPage.totalPages;
    },
    handleAddWorkflow() {
      this.workflowList.push({
        id: null,
        name: "",
        products:[],
        productCategories: [],
        steps: [],
      });
    },
  },
};
</script>

<style scoped></style>
