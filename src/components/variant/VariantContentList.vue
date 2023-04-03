<template>
  <div>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.variant.addContent") }}
      </template>
      <template v-slot:body>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  {{ $t("views.variant.fields.content") }}
                </th>
                <th class="text-left">
                  {{ $t("views.variant.fields.name") }}
                </th>
                <th class="text-left">
                  {{ $t("views.variant.fields.action") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in contents" :key="index">
                <td>
                  <SmallImage :filename="item.existingPicturePath" />
                </td>
                <td>{{ item.name }}</td>
                <td>
                  <v-btn
                    elevation="2"
                    class="mr-5"
                    color="primary"
                    @click="
                      () => {
                        handleEdit(item);
                      }
                    "
                  >
                    {{ $t("views.variant.editContent") }}</v-btn
                  >
                  <v-btn
                    elevation="2"
                    color="primary"
                    @click="
                      () => {
                        handleDelete(item.id);
                      }
                    "
                  >
                    {{ $t("views.variant.delete") }}</v-btn
                  >
                </td>
              </tr>
              <tr v-if="contents.length === 0">
                <td colspan="5">No matching records found</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
      <template v-slot:footer>
        <v-row>
          <v-col cols="6">
            <v-btn
              elevation="2"
              class="mr-5"
              color="primary"
              @click="
                () => {
                  handleAdd(item);
                }
              "
            >
              {{ $t("views.variant.addContent") }}</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-pagination
              v-model="pagination.pageNumber"
              :length="pagination.totalPages"
            ></v-pagination>
          </v-col>
        </v-row>
      </template>
    </BasicForm>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <ConfirmationDialog ref="confirmationDialog" />
    <v-dialog v-model="showEditPopup" persistent>
      <EditVariantContent
        v-if="showEditPopup"
        :variantId="id"
        :content="toBeUpdatedContent"
        @on:refresh="handleRefresh"
        @close:dialog="showEditPopup = !showEditPopup"
      />
    </v-dialog>
  </div>
</template>

<script>
import EditVariantContent from "./EditVariantContent";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import SmallImage from "../common/SmallImage";
import BasicForm from "../layout/BasicForm";
import VariantService from "../../services/Variant.service";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useErrorMessage } from "../../store/error-message";
export default {
  props: ["id"],
  components: {
    EditVariantContent,
    BasicForm,
    SmallImage,
    ConfirmationDialog,
    LoadingDialog,
  },
  data() {
    return {
      showEditPopup: false,
      contents: [],
      pagination: {
        pageNumber: 1,
        totalPages: 0,
        pageSize: 20,
      },
      isLoading: false,
      toBeUpdatedContent: null,
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useReferenceData, ["variantTypes"]),
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    async handleAdd() {
      this.toBeUpdatedContent = {
        id: null,
        name: "",
      };
      this.showEditPopup = true;
    },
    async handleEdit(content) {
      this.toBeUpdatedContent = { ...content };
      this.showEditPopup = true;
    },
    async handleDelete(contentId) {
      const yes = await this.$refs.confirmationDialog.showDialog(
        "views.variant.confirmations.removeContent"
      );
      if (yes) {
        try {
          this.isLoading = true;
          await VariantService.deleteContent(this.id, contentId);
          await this.handleRefresh();
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          this.pushError(error);
        }
      }
    },
    async handleRefresh() {
      try {
        this.isLoading = true;
        const response = await VariantService.getContent(
          this.id,
          this.pagination
        );
        this.contents = response.content;
        this.pagination.totalPages = response.totalPages;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
  },
};
</script>
