<template>
  <v-container>
    <slot name="breadcrumb"></slot>
    <v-row>
      <v-col cols="12">
        <h3>{{ $t("views.workflow.title") }}</h3>
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
      <v-col lg="10" md="8" sm="6">
        <v-text-field
          outlined
          v-model="filter.query"
          :label="$t('views.workflow.search')"
          append-icon="mdi-magnify"
          @change="handleRefresh"
        ></v-text-field>
      </v-col>
      <v-col lg="2" md="4" sm="6">
        <v-select
          v-model="filter.productCategoryId"
          :items="categories"
          item-text="name"
          item-value="id"
          :label="$t('views.product.fields.productCategory')"
          outlined
          @change="handleRefresh"
        ></v-select>
      </v-col>
    </v-row>
    <v-row v-for="item of workflowList" :key="item.id">
      <v-col cols="12">
        <WorkflowListItem :workflow="item" @on:refresh="handleRefresh" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination color="pink lighten-1" 
          @input="handleRefresh"
          v-model="pagination.pageNumber"
          :length="pagination.totalPages"
        ></v-pagination>
      </v-col>
    </v-row>

    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <ConfirmationDialog ref="confirmationDialog" />
  </v-container>
</template>

<script>
import ConfirmationDialog from "../../components/dialogs/ConfirmationDialog";
import LoadingDialog from "../../components/dialogs/LoadingDialog.vue";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useErrorMessage } from "../../store/error-message";
import WorkflowService from "../../services/Workflow.service";
import WorkflowListItem from "../../components/workflow/WorkflowListItem";
export default {
  name: "WorkflowComponent",
  components: {
    WorkflowListItem,
    ConfirmationDialog,
    LoadingDialog,
  },
  data() {
    return {
      filter: {
        query: "",
        productCategoryId: "",
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
      isLoading: false,
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useReferenceData, ["categories"]),
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    async handleRefresh() {
      try {
        this.isLoading = true;
        const workflowPage = await WorkflowService.getWorkflows({
          ...this.filter,
          page:this.pagination.pageNumber-1,pageSize:this.pagination.pageSize,
        });
        this.workflowList = workflowPage.content.map((item) => {
          return {
            ...item,
            isView: true,
          };
        });
        this.pagination.totalPages = workflowPage.totalPages;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
    handleAddWorkflow() {
      this.workflowList.push({
        id: null,
        name: "",
        products: [],
        productCategories: [],
        steps: [],
      });
    },
  },
};
</script>

<style scoped></style>
