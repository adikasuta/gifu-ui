<template>
  <ValidationObserver ref="observer">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col lg="5" sm="6">
            <v-text-field
              :label="$t('views.workflow.fields.workflowName')"
              v-model="workflowContent.name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col lg="5" offset-lg="1" sm="6">
            <h3>{{ $t("views.workflow.fields.products") }}</h3>
            <p>{{ getNames(workflowContent.products, ", ") }}</p>
          </v-col>
        </v-row>
        <v-divider class="mb-5"></v-divider>
        <v-row>
          <v-col lg="4" md="6">
            <h3>{{ $t("views.workflow.fields.category") }}</h3>
          </v-col>
          <v-col cols="1">
            <p>DE</p>
          </v-col>
          <v-col cols="1">
            <p>PE</p>
          </v-col>
          <v-col lg="6" md="4">
            <v-btn elevation="2" small @click="handleAddNewCategory">
              <v-icon dark> mdi-plus </v-icon>
              {{ $t("views.workflow.addNewCategory") }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row
          v-for="(item, index) of workflowContent.productCategories"
          :key="item.id"
        >
          <v-col lg="4" md="6">
            <v-select
              item-text="name"
              item-value="id"
              item-disabled="disabled"
              :items="getCategoryRefs"
              @change="
                (e) => {
                  handleChangeCategory(e, index);
                }
              "
              :label="$t('views.workflow.fields.category')"
              outlined
              v-model="item.id"
            >
            </v-select>
          </v-col>
          <v-col cols="1">
            <p>{{ item.designEstimation }}</p>
          </v-col>
          <v-col cols="1">
            <p>{{ item.productionEstimation }}</p>
          </v-col>
          <v-col lg="6" md="4">
            <v-btn
              elevation="2"
              small
              @click="() => handleEditCategory(index)"
              class="mr-5"
            >
              {{ $t("views.workflow.edit") }}</v-btn
            >
            <v-btn
              class="mr-5"
              elevation="2"
              small
              @click="() => handleRemoveMapping(index)"
            >
              {{ $t("views.workflow.removeCategoryMapping") }}</v-btn
            >
            <v-btn
              elevation="2"
              small
              @click="() => handleRemoveCategory(index)"
            >
              {{ $t("views.workflow.removeCategoryCompletely") }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-btn elevation="2" small @click="handleAddCategoryMapping">
              {{ $t("views.workflow.addCategory") }}</v-btn
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <h4>{{ $t("views.workflow.fields.step") }}</h4>
          </v-col>
          <v-col cols="4">
            <h4>{{ $t("views.workflow.fields.assignTo") }}</h4>
          </v-col>
          <v-col cols="2">
            <h4>{{ $t("views.workflow.fields.needApproval") }}</h4>
          </v-col>
          <v-col cols="2">
            <v-btn elevation="2" @click="handleAddStep" small>
              {{ $t("views.workflow.addStep") }}</v-btn
            >
          </v-col>
        </v-row>
        <draggable v-model="workflowContent.steps" @start="true">
          <v-row v-for="(item, index) of workflowContent.steps" :key="item.id">
            <v-col cols="4">
              <v-text-field
                :label="$t('views.workflow.fields.step')"
                outlined
                v-model="item.name"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                item-text="name"
                item-value="id"
                v-model="item.assignedToUserId"
                :items="users"
                cache-items
                outlined
                flat
                hide-no-data
                hide-details
                :label="$t('views.workflow.fields.assignTo')"
              ></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-checkbox
                v-model="item.needApproval"
                :label="$t('views.workflow.fields.needApproval')"
              ></v-checkbox>
            </v-col>
            <v-col cols="2">
              <v-btn
                class="mr-5"
                @click="
                  () => {
                    handleDeleteStep(index);
                  }
                "
                elevation="2"
                small
                ><v-icon> mdi-trash-can </v-icon></v-btn
              ><v-btn elevation="2" small
                ><v-icon> mdi-drag </v-icon></v-btn
              ></v-col
            >
          </v-row>
        </draggable>
      </v-card-text>
      <v-card-actions
        style="flex-direction: row-reverse"
        class="pt-5 pb-5 pr-5 pl-5"
      >
        <v-btn elevation="2" color="primary" @click="handleSaveWorkflow">
          {{ $t("views.workflow.save") }}</v-btn
        >
        <v-btn elevation="2" color="primary" @click="handleBack" class="mr-5">
          {{ $t("views.workflow.back") }}</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-dialog v-model="isAddNewCategory" persistent>
      <AddNewCategory
        v-if="isAddNewCategory"
        @close:dialog="toggleCategoryDialog"
        :category="toBeChangedCategory"
      />
    </v-dialog>
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
  </ValidationObserver>
</template>

<script>
import ErrorDialog from "../dialogs/ErrorDialog.vue";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import draggable from "vuedraggable";
import AddNewCategory from "./AddNewCategory";
import { mapState } from "pinia";
import StringUtils from "../../utils/StringUtils";
import { useReferenceData } from "../../store/reference-data";
import WorkflowService from "../../services/Workflow.service";
import CategoryService from "../../services/Category.service";
// import { ValidationObserver } from "vee-validate";
// import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
export default {
  name: "WorkflowEditMode",
  components: {
    LoadingDialog,
    draggable,
    AddNewCategory,
    ConfirmationDialog,
    ErrorDialog,
  },
  props: ["workflow"],
  data() {
    return {
      workflowContent: this.workflow,
      isLoading: false,
      isAddNewCategory: false,
      toBeChangedCategory: null,
      isError: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapState(useReferenceData, ["categories", "users"]),
    getCategoryRefs() {
      const categoryIds = this.workflowContent.productCategories.map((it) => {
        return it.id;
      });
      return this.categories.map((it) => {
        const disabled = categoryIds.includes(it.id);
        return {
          ...it,
          disabled,
        };
      });
    },
  },
  methods: {
    ...StringUtils,
    handleRemoveMapping(index) {
      this.workflowContent.productCategories.splice(index, 1);
    },
    async handleRemoveCategory(index) {
      const yes = await this.$refs.confirmationDialog.showDialog(
        "views.workflow.confirmations.removeCategory"
      );
      if (yes) {
        try {
          this.isLoading = true;
          const selected = this.workflowContent.productCategories[index];
          await CategoryService.deleteProductCategory(selected.id);
          this.workflowContent.productCategories.splice(index, 1);
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
    handleChangeCategory(e, index) {
      const ref = this.categories.filter((it) => {
        return it.id == e;
      });
      this.workflowContent.productCategories[index].designEstimation =
        ref[0].designEstimation;
      this.workflowContent.productCategories[index].productionEstimation =
        ref[0].productionEstimation;
    },
    handleEditCategory(index) {
      this.toBeChangedCategory = this.workflowContent.productCategories[index];
      this.toggleCategoryDialog();
    },
    handleAddNewCategory() {
      this.toBeChangedCategory = {
        id: null,
        name: "",
        productType: null,
        designEstimation: null,
        productionEstimation: null,
      };
      this.toggleCategoryDialog();
    },
    toggleCategoryDialog() {
      this.isAddNewCategory = !this.isAddNewCategory;
    },
    handleChangeName(e) {
      const changed = {
        ...this.workflowContent,
        name: e,
      };
      this.$emit("on:changeName", changed);
    },
    async handleSaveWorkflow() {
      try {
        this.isLoading = true;
        const request = {
          ...this.workflowContent,
          productCategoryIds: this.workflowContent.productCategories.map(
            (it) => it.id
          ),
        };
        if (this.workflow.id) {
          await WorkflowService.putWorkflows(request);
        } else {
          await WorkflowService.postWorkflows(request);
        }
        this.$emit("on:refresh");
        this.$emit("on:view");
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
    handleBack() {
      this.$emit("on:refresh");
      this.$nextTick(() => {
        this.$emit("on:view");
      });
    },
    handleEdit() {
      this.$emit("on:edit");
    },
    handleAddCategoryMapping() {
      this.workflowContent.productCategories.push({
        id: null,
        name: "",
      });
    },
    handleAddStep() {
      this.workflowContent.steps.push({
        id: null,
        name: "",
        needApproval: false,
        assignedToUserId: null,
      });
    },
    handleDeleteStep(index) {
      this.workflowContent.steps.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>
