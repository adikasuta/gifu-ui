<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="8">
          <v-text-field
            v-model="filterItems.searchQuery"
            label="Search"
            outlined
            clearable
            @change="handleRefresh"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="filterItems.variantTypeCode"
            :items="variantTypes"
            label="Filter"
            outlined
            @change="handleRefresh"
          ></v-select>
        </v-col>
      </v-row>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                {{ $t("views.variant.fields.catalog") }}
              </th>
              <th class="text-left">
                {{ $t("views.variant.fields.variantTypeCode") }}
              </th>
              <th class="text-left">
                {{ $t("views.variant.fields.numberOfContent") }}
              </th>
              <th class="text-left">
                {{ $t("views.variant.fields.numberOfUsage") }}
              </th>
              <th class="text-left">{{ $t("views.variant.fields.action") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in variants" :key="index">
              <td>
                {{ item.name }}
                <v-row>
                  <v-col
                    cols="3"
                    v-for="(pic, picIndex) in item.contentPics"
                    :key="picIndex"
                  >
                    <SmallImage :filename="pic" />
                  </v-col>
                </v-row>
              </td>
              <td>{{ item.variantTypeCode }}</td>
              <td>{{ item.numberOfContent }}</td>
              <td>{{ item.numberOfUsage }}</td>
              <td>
                <v-btn
                  elevation="2"
                  class="mr-5"
                  color="primary"
                  @click="
                    () => {
                      handleEdit(item.id);
                    }
                  "
                >
                  {{ $t("views.variant.edit") }}</v-btn
                >
                <v-btn elevation="2" color="primary" @click="()=>{handleDelete(item.id)}">
                  {{ $t("views.variant.delete") }}</v-btn
                >
              </td>
            </tr>
            <tr v-if="variants.length === 0">
              <td colspan="5">No matching records found</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-row>
        <v-col cols="12">
          <v-pagination
            v-model="pagination.pageNumber"
            :length="pagination.totalPages"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
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
import SmallImage from "../common/SmallImage";
import VariantService from "../../services/Variant.service";
import { mapState } from "pinia";
import { useReferenceData } from "../../store/reference-data";
export default {
  components: {
    SmallImage,
    ErrorDialog,
    ConfirmationDialog,
    LoadingDialog,
  },
  data() {
    return {
      filterItems: {
        searchQuery: "",
        variantTypeCode: null,
      },
      variants: [],
      pagination: {
        pageNumber: 1,
        totalPages: 0,
        pageSize: 20,
      },
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useReferenceData, ["variantTypes"]),
  },
  methods: {
    async handleEdit(id) {
      this.$router.push(`/dashboard/variant/${id}`);
    },
    async handleDelete(id) {
      const yes = await this.$refs.confirmationDialog.showDialog(
        "views.variant.confirmations.removeVariant"
      );
      if (yes) {
        try {
          this.isLoading = true;
          await VariantService.deleteVariant(id);
          await this.handleRefresh();
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
    async handleRefresh() {
      try {
        this.isLoading = true;
        const variantPage = await VariantService.getSearchVariant({
          ...this.filterItems,
          ...this.pagination,
        });
        this.variants = variantPage.content.map((it) => {
          return {
            ...it,
            contentPics: it.contentPics.slice(0, 4),
          };
        });
        this.pagination.totalPages = variantPage.totalPages;
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
